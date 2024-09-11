import { RiWifiOffLine } from 'react-icons/ri';
import { useRecoilValue } from 'recoil';
import { connectionErrorState } from '../../../../state/kioskState';
import CurrentDepartures from './currentDepartures';
import GeneralMessage from './generalMessage';
import IconMessageCarousel from './IconMessageCarousel';
import styles from './KioskDepartures.module.css';
import PageIndicator from './pageIndicator';

export default function KioskDepartureList() {
	const connectionError = useRecoilValue(connectionErrorState);

	if (connectionError) {
		// TODO: Make this its own component
		return (
			<div className={styles.connectionError}>
				<RiWifiOffLine /> Network error. Call 217-384-8188 for help.
			</div>
		);
	}

	return (
		<div className={styles.kioskDeparturesContainer}>
			<GeneralMessage />
			<CurrentDepartures />
			<IconMessageCarousel />
			<PageIndicator />
		</div>
	);
}
