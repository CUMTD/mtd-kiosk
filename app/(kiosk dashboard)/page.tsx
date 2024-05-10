import { useSession } from 'next-auth/react';
import KioskCards from '../../components/kioskCards';
import KioskMap from '../../components/kioskMap';
import getHealthStatuses, { fetchKioskList } from '../../helpers/httpMethods';
import { ServerHealthStatuses } from '../../types/serverHealthStatuses';

export default async function Home() {
	const kiosks = await fetchKioskList();
	const healthStatuses = (await getHealthStatuses()) as ServerHealthStatuses[];

	// TODO: fetch health statuses and pass to children
	// and make a new api endpoint to get ALL health statuses

	return (
		<>
			<KioskMap healthStatuses={healthStatuses} />
			<KioskCards kiosks={kiosks} healthStatuses={healthStatuses} />
		</>
	);
}
