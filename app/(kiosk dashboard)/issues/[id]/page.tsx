import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchKioskById, fetchKioskTickets, getHealthStatus } from '../../../../helpers/httpMethods';
import { TicketStatusType } from '../../../../types/kioskTicket';
import LedPreview from '../../led/ledPreview';
import LedPreviewPlaceholder from '../../led/ledPreviewPlaceholder';
import AdsPreview from './AdsPreview';
import InfoContainer from './InfoContainer';
import IssuesList from './issuesList';
import NewIssueForm from './newIssueForm';
import NewIssueRoot from './newIssueRoot';
import styles from './page.module.css';

interface Props {
	params: { id: string };
}

export const revalidate = 0;

export async function generateMetadata({ params: { id } }: Readonly<Props>): Promise<Metadata> {
	const kiosk = await fetchKioskById(id);

	return {
		title: kiosk.displayName + ' Kiosk Details'
	};
}

// get [id] from the URL
export default async function IssuePage({ params: { id } }: Readonly<Props>) {
	const kiosk = await fetchKioskById(id);
	const issues = await fetchKioskTickets(id);

	const openIssues = issues.filter((issue) => issue.status == TicketStatusType.OPEN).length;
	const closedIssues = issues.filter((issue) => issue.status == TicketStatusType.RESOLVED).length;
	const healthStatus = await getHealthStatus(id);

	return (
		<section className={styles.parent}>
			<InfoContainer kiosk={kiosk} healthStatus={healthStatus} />
			{kiosk.hasLed && (kiosk.ledIp?.length ?? 0) > 0 && (
				<div className={styles.children}>
					<h2 style={{ paddingBottom: '1em' }}>LED Preview</h2>
					<Suspense fallback={<LedPreviewPlaceholder />}>
						<LedPreview kioskId={kiosk._id} ledIp={kiosk.ledIp!} clickable={false} />
					</Suspense>
				</div>
			)}
			<div className={styles.children}>
				<AdsPreview kioskId={kiosk._id} />
			</div>

			<div className={styles.children}>
				<div>
					<div className={styles.issuesHeader}>
						<h2>{issues.length == 0 ? 'No' : issues.length} Issues</h2>

						<NewIssueRoot kioskId={kiosk._id}>
							<NewIssueForm kioskId={kiosk._id} />
						</NewIssueRoot>
						<span style={{ flex: 1 }} />
						{issues.length > 0 && (
							<span className={styles.issueCount}>
								{openIssues} Open, {closedIssues} Closed
							</span>
						)}
					</div>

					<IssuesList kioskId={id} />
				</div>
			</div>
		</section>
	);
}
