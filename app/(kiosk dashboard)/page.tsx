import { Metadata } from 'next';
import KioskCards from '../../components/kioskCards';
import KioskMap from '../../components/kioskMap';
import { fetchKioskList, getHealthStatuses } from '../../helpers/httpMethods';

export const metadata: Metadata = {
	title: 'Kiosk Dashboard'
};

export default async function Home() {
	const kiosks = await fetchKioskList();
	const healthStatuses = await getHealthStatuses();

	return (
		<>
			<KioskMap healthStatuses={healthStatuses} />
			<KioskCards kiosks={kiosks} healthStatuses={healthStatuses} />
		</>
	);
}
