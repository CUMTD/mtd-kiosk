import { useRecoilValue } from 'recoil';
import { blockRealtimeSelector, currentPageDeparturesSelector } from '../../../../state/kioskState';
import DepartureItem from './DepartureItem';
import styles from './KioskDepartures.module.css';

export default function CurrentDepartures() {
	const currentPageDepartures = useRecoilValue(currentPageDeparturesSelector);
	const blockRealtime = useRecoilValue(blockRealtimeSelector);

	if (blockRealtime) {
		return null;
	}

	if (!currentPageDepartures || currentPageDepartures.length == 0) {
		return <div className={styles.noDepartures}>No departures in the next hour.</div>;
	}

	return (
		<>
			<div className={styles.kioskDepartures}>
				{currentPageDepartures.map((departure, index) => (
					<DepartureItem route={departure} key={index} />
				))}
			</div>
		</>
	);
}
