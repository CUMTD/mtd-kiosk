import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import { Kiosk } from '../../../../sanity.types';
import KioskAds from './KioskAds';

interface KioskDisplayProps {
	kiosk: Kiosk;
}

export default async function KioskDisplay({ kiosk }: KioskDisplayProps) {
	return (
		<div className={styles.kioskDisplay}>
			<KioskHeader stopName={kiosk.displayName} iStop={kiosk.iStop} />
			<KioskDepartures kiosk={kiosk} />
			<KioskAds kiosk={kiosk} />
		</div>
	);
}
