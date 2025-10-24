import { RiWifiOffLine } from 'react-icons/ri';
import styles from './KioskOfflineBanner.module.css';

export default function KioskOffline() {
	return (
		<div className={styles.connectionError}>
			<RiWifiOffLine /> Network error. Call 217-384-8188 for help.
		</div>
	);
}
