import { useAtomValue } from 'jotai';
import { connectionErrorState, generalMessageState } from '../../../../state/kioskState';
import CurrentDepartures from './currentDepartures';
import GeneralMessage from './generalMessage';
import IconMessageCarousel from './IconMessageCarousel';
import styles from './KioskDepartures.module.css';
import PageIndicator from './pageIndicator';
import KioskOffline from './KioskOfflineBanner';

export default function KioskDepartureList() {
	const connectionError = useAtomValue(connectionErrorState);
	const generalMessage = useAtomValue(generalMessageState);

	if (connectionError) {
		return <KioskOffline />;
	}

	return (
		<div className={styles.kioskDeparturesContainer}>
			<GeneralMessage />
			<CurrentDepartures />
			<IconMessageCarousel />
			{!generalMessage?.blockRealtime && <PageIndicator />}
		</div>
	);
}
