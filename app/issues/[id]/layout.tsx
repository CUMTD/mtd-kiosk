import { IndividualKioskMap } from '../../../components/kioskMap';
import KioskStatusBadge from '../../../components/kioskStatusBadge';
import { fetchKiosk, fetchKioskList } from '../../../helpers/httpMethods';
import getHealthStatuses from '../../../helpers/httpMethods';
import { Kiosk } from '../../../sanity/schemas/documents/kiosk';
import { KioskObject } from '../../../types/KioskObjects';
import styles from './layout.module.css';
import KioskCards from '../../../components/kioskCards';
import InfoContainer from './InfoContainer';

export default async function IssueLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
	const kiosk = (await fetchKiosk(params.id)) as Kiosk;
	const healthStatus = await getHealthStatuses(params.id);
	const kiosks = await fetchKioskList();

	return (
		<>
			<section className={styles.parent}>
				<InfoContainer kiosk={kiosk} healthStatus={healthStatus} />
				<div className={styles.children}>{children}</div>
			</section>
			<aside className={styles.kioskCards}>
				<KioskCards kiosks={kiosks} readonly />
			</aside>
		</>
	);
}
