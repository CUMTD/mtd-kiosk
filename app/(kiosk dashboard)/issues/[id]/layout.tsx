import styles from './layout.module.css';
import InfoContainer from './InfoContainer';
import getHealthStatuses, { fetchKiosk, fetchKioskList } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity/schemas/documents/kiosk';
import KioskCards from '../../../../components/kioskCards';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';

export default async function IssueLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
	const kiosk = (await fetchKiosk(params.id)) as Kiosk;
	const healthStatus = (await getHealthStatuses(params.id)) as ServerHealthStatuses;
	const healthStatuses = (await getHealthStatuses()) as ServerHealthStatuses[];

	const kiosks = await fetchKioskList();

	return (
		<>
			<section className={styles.parent}>
				<InfoContainer kiosk={kiosk} healthStatus={healthStatus} />
				<div className={styles.children}>{children}</div>
			</section>
			<aside className={styles.kioskCards}>
				<KioskCards kiosks={kiosks} readonly healthStatuses={healthStatuses} />
			</aside>
		</>
	);
}
