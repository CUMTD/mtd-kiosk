import KioskAds from './KioskAds';
import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import { Kiosk } from '../../../../sanity.types';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';

interface KioskDisplayProps {
	kiosk: Kiosk;
}

export default async function KioskDisplay({ kiosk }: KioskDisplayProps) {
	var kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	//refetch ads every hour
	setInterval(async () => {
		console.log('Fetching ads');
		kioskAds = await fetchKioskAdsByKioskId(kiosk._id);
	}, 3600000);

	return (
		<div className={styles.kioskDisplay}>
			<KioskHeader stopName={kiosk.displayName} iStop={kiosk.iStop} />
			<KioskDepartures kiosk={kiosk} />
			<KioskAds advertisements={kioskAds} />
		</div>
	);
}
