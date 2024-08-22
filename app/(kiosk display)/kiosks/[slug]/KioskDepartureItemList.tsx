import { useRecoilValue } from 'recoil';
import styles from './KioskDepartures.module.css';
import { connectionErrorState, departureState, generalMessageState } from '../../../../state/kioskState';
import DepartureItem from './DepartureItem';
import RealTimeIcon from './RealTimeIcon';
import { RiWifiOffLine } from 'react-icons/ri';
import { useEffect, useRef } from 'react';

export default function KioskDepartureItemList() {
	const scrollText = useRef<HTMLSpanElement>(null);
	const scrollContainer = useRef<HTMLDivElement>(null);

	const departures = useRecoilValue(departureState);
	const generalMessage = useRecoilValue(generalMessageState);
	const connectionError = useRecoilValue(connectionErrorState);

	useEffect(() => {
		if (generalMessage && scrollText.current && scrollContainer.current) {
			scrollText.current.style.animationDuration = scrollAnimationDuration(generalMessage.text);
		}
	}, [generalMessage]);

	if (connectionError) {
		return (
			<div className={styles.connectionError}>
				<RiWifiOffLine /> Network error. Call 217-384-8188 for help.
			</div>
		);
	}

	const scrollAnimationDuration = (text: string, speed = 90) => {
		//amount of pixels per second * (width of message + container width)
		const messageWidth = text.length * 10;
		const containerWidth = scrollContainer.current?.offsetWidth || 0;
		const totalWidth = messageWidth + containerWidth;

		const duration = totalWidth / speed;
		return `${duration}s`;
	};

	return (
		<>
			<div className={styles.kioskDeparturesContainer}>
				{generalMessage && generalMessage.blocksRealtime ? (
					<div className={styles.realtimeBlockingGeneralMessage}>{generalMessage.text}</div>
				) : (
					<>
						{generalMessage && (
							<div ref={scrollContainer} className={styles.generalMessage}>
								<span ref={scrollText} style={{ animationDuration: scrollAnimationDuration(generalMessage.text) }}>
									{generalMessage.text}
								</span>
							</div>
						)}

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
