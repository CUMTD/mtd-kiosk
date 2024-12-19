import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchKioskById, fetchKioskTickets, getHealthStatus } from '../../../../../helpers/httpMethods';
import KioskTicket, { TicketStatusType } from '../../../../../types/kioskTicket';
import LedPreview from '../../led/ledPreview';
import LedPreviewPlaceholder from '../../led/ledPreviewPlaceholder';
import AdsPreview from './AdsPreview';
import InfoContainer from './InfoContainer';
import IssuesList from './issuesList';
import NewIssueForm from './newIssueForm';
import NewIssueRoot from './newIssueRoot';
import styles from './page.module.css';
import { Kiosk } from '../../../../../sanity.types';
import { ServerHealthStatuses } from '../../../../../types/serverHealthStatuses';
import LedSignIcon from '../../../../../components/ledSignIcon';

interface Props {
	params: { id: string };
}

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
			<IssuePageStructure kiosk={kiosk} issues={issues} openIssues={openIssues} closedIssues={closedIssues} healthStatus={healthStatus} />
		</section>
	);
}

interface IssuePageStructureProps {
	kiosk: Kiosk;
	issues: KioskTicket[];
	openIssues: number;
	closedIssues: number;
	healthStatus: ServerHealthStatuses | null;
}

function IssuePageStructure({ kiosk, issues, openIssues, closedIssues, healthStatus }: IssuePageStructureProps) {
	return (
		<>
			<InfoContainer kiosk={kiosk} healthStatus={healthStatus} />
			{kiosk.hasLed && (kiosk.ledIp?.length ?? 0) > 0 && (
				<div className={styles.children}>
					<h2 style={{ paddingBottom: '1em' }}>
						<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<span>
								<LedSignIcon /> LED Sign{' '}
							</span>
							<code style={{ fontWeight: 'regular' }}>{kiosk.ledIp}</code>
						</span>
					</h2>

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

					<IssuesList kioskId={kiosk._id} />
				</div>
			</div>
		</>
	);
}
