import { useRecoilValue } from 'recoil';
import { blockRealtimeSelector, currentPageDeparturesSelector } from '../../../../state/kioskState';
import DepartureItem from './DepartureItem';
import styles from './KioskDepartures.module.css';

import { TbClockX } from 'react-icons/tb';

export default function CurrentDepartures() {
	const currentPageDepartures = useRecoilValue(currentPageDeparturesSelector);
	const blockRealtime = useRecoilValue(blockRealtimeSelector);

	if (blockRealtime) {
		return null;
	}

	if (!currentPageDepartures || currentPageDepartures.length == 0) {
		return (
			<div className={styles.noDepartures}>
				<TbClockX size={'1.5em'} className={styles.noDeparturesIcon} />
				<p>No departures scheduled for the next hour.</p>
			</div>
		);
	}

	return (
		<div className={styles.kioskDepartures}>
			{currentPageDepartures.map((departure, index) => (
				<DepartureItem route={departure} key={index} />
			))}
		</div>
	);
}
