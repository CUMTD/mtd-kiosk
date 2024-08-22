import { useRecoilValue } from 'recoil';
import styles from './KioskDepartures.module.css';
import { connectionErrorState, departureState, generalMessageState } from '../../../../state/kioskState';
import DepartureItem from './DepartureItem';
import RealTimeIcon from './RealTimeIcon';
import { RiWifiOffLine } from 'react-icons/ri';

export default function KioskDepartureItemList() {
	const departures = useRecoilValue(departureState);
	const generalMessage = useRecoilValue(generalMessageState);
	const connectionError = useRecoilValue(connectionErrorState);

	if (connectionError) {
		return (
			<div className={styles.connectionError}>
				<RiWifiOffLine /> Network error. Call 217-384-8188 for help.
			</div>
		);
	}
	return (
		<>
			<div className={styles.kioskDeparturesContainer}>
				{generalMessage && generalMessage.blocksRealtime ? (
					<div className={styles.generalMessage}>{generalMessage.text}</div>
				) : (
					<>
						{generalMessage && <div className={styles.generalMessage}>{generalMessage.text}</div>}

						{!departures || (departures.length == 0 && <div className={styles.noDepartures}>No departures in the next hour.</div>)}

						<div className={styles.kioskDepartures}>
							{departures.map((departure, index) => (
								// <Suspense key={index} fallback={<DepartureItemSkeleton />}>
								<DepartureItem route={departure} key={index} />
								// </Suspense>
							))}
						</div>
					</>
				)}

				{departures.length > 0 && <RealtimeExplainer />}
			</div>
		</>
	);
}

function RealtimeExplainer() {
	return (
		<div className={styles.realtimeExplainer}>
			<RealTimeIcon /> indicates GPS-tracked realtime information
		</div>
	);
}
