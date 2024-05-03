import { useSession } from 'next-auth/react';
import KioskCards from '../components/kioskCards';
import KioskMap from '../components/kioskMap';
import { fetchKioskList } from '../helpers/httpMethods';

export default async function Home() {
	const kiosks = await fetchKioskList();
	// const healthStatuses = await getHealthStatuses();

	return (
		<>
			<KioskMap />
			<KioskCards kiosks={kiosks} />
		</>
	);
}
