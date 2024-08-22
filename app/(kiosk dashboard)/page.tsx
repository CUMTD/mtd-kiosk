import { Metadata } from 'next';
import KioskCards from '../../components/kioskCards';
import KioskMap from '../../components/kioskMap';
import getHealthStatuses, { fetchKioskList } from '../../helpers/httpMethods';
import { ServerHealthStatuses } from '../../types/serverHealthStatuses';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Kiosk Dashboard'
};

export default async function Home() {
	const kiosks = await fetchKioskList();
	const healthStatuses = (await getHealthStatuses()) as ServerHealthStatuses[];

	return (
		<>
			<KioskMap healthStatuses={healthStatuses} />
			<KioskCards kiosks={kiosks} healthStatuses={healthStatuses} />
		</>
	);
}
