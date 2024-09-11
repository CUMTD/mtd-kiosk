import { useRecoilValue } from 'recoil';
import { connectionErrorState } from '../../../../state/kioskState';
import CurrentDepartures from './currentDepartures';
import GeneralMessage from './generalMessage';
import IconMessageCarousel from './IconMessageCarousel';
import styles from './KioskDepartures.module.css';
import PageIndicator from './pageIndicator';
import KioskOfflineBanner from './KioskOfflineBanner';

export default function KioskDepartureList() {
	const connectionError = useRecoilValue(connectionErrorState);

	if (connectionError) {
		return <KioskOfflineBanner />;
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
