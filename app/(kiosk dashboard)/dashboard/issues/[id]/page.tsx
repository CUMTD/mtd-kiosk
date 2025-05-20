import { Metadata } from 'next';
import { Suspense } from 'react';
import { fetchKioskById, fetchKioskTickets, getHealthStatus } from '../../../../../helpers/httpMethods';
import KioskTicket from '../../../../../types/kioskTicket';
import AdsPreview from './AdsPreview';
import InfoContainer from './InfoContainer';
import NewIssueForm from './newIssueForm';
import NewIssueRoot from './newIssueRoot';
import styles from './page.module.css';
import { Kiosk } from '../../../../../sanity.types';
import { ServerHealthStatuses } from '../../../../../types/serverHealthStatuses';
import TemperatureData from './TemperatureData';
import InfoCard from '../InfoCard';
import { HealthStatus } from '../../../../../types/HealthStatus';
import IndividualKioskMap from '../../../../../components/map/individualKioskMap';

interface Props {
	params: { id: string };
}

export async function generateMetadata({ params: { id } }: Readonly<Props>): Promise<Metadata> {
	const kiosk = await fetchKioskById(id);

	return { title: kiosk.displayName };
}

// get [id] from the URL
export default async function IssuePage({ params: { id } }: Readonly<Props>) {
	const kiosk = await fetchKioskById(id);
	const issues = await fetchKioskTickets(id);

	const healthStatus = await getHealthStatus(id);

	return (
		<section className={styles.parent}>
			<IssuePageStructure kiosk={kiosk} issues={issues} healthStatus={healthStatus} />
		</section>
	);
}

interface IssuePageStructureProps {
	kiosk: Kiosk;
	issues: KioskTicket[];

	healthStatus: ServerHealthStatuses | null;
}

function IssuePageStructure({ kiosk, issues, healthStatus }: IssuePageStructureProps) {
	return (
		<>
			<InfoContainer kiosk={kiosk} />
			<div className={styles.infoCards}>
				<NewIssueRoot kioskId={kiosk._id}>
					<NewIssueForm kioskId={kiosk._id} issues={issues} />
				</NewIssueRoot>
				<InfoCard title="Map">
					<IndividualKioskMap kiosk={kiosk} health={healthStatus?.overallHealth ?? HealthStatus.UNKNOWN} />
				</InfoCard>
				<TemperatureData kioskId={kiosk._id} />
				<InfoCard title="Advertisements" wide>
					<AdsPreview kioskId={kiosk._id} />
				</InfoCard>
			</div>
		</>
	);
}
