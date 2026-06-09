import { useRecoilValue } from 'recoil';
import { connectionErrorState, showMapState } from '../../../../state/kioskState';
import CurrentDepartures from './currentDepartures';
import GeneralMessage from './generalMessage';
import IconMessageCarousel from './IconMessageCarousel';
import styles from './KioskDepartures.module.css';
import KioskOffline from './KioskOfflineBanner';
import KioskLocalMap from './KioskLocalMap';

export default function KioskDepartureList() {
	const connectionError = useRecoilValue(connectionErrorState);
	const showMap = useRecoilValue(showMapState);

	if (connectionError) {
		return <KioskOffline />;
	}

	return (
		<div className={styles.riderInformationContainer}>
			<GeneralMessage />
			<CurrentDepartures />
			<IconMessageCarousel />
			{showMap && <KioskLocalMap />}
		</div>
	);
}
