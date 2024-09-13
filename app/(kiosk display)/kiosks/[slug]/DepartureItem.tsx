import clsx from 'clsx';
import { FaPersonWalkingDashedLineArrowRight } from 'react-icons/fa6';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import styles from './DepartureItem.module.css';
import RealTimeIcon from './RealTimeIcon';

interface DepartureProps {
	route: GroupedRoute;
}

export default function DepartureItem({
	route: { number, name, backgroundHexColor, foregroundHexColor, isAcrossStreet, direction, departureTimes }
}: DepartureProps) {
	const darkMode = useRecoilValue(darkModeState);

	const routeNumberClasses = clsx({
		[styles.routeNumber]: true,
		[styles.smallRouteNumber]: number.length > 2
	});

	const departureTimeClasses = clsx({
		[styles.departureTime]: true
		// [styles.multiLineDepartures]: departureTimes.filter(({ isHopper, modifier }) => isHopper || (modifier && modifier.length > 0)).length > 0
	});

	return (
		<div className={styles.departureItem}>
			<div
				className={routeNumberClasses}
				style={{
					backgroundColor: backgroundHexColor,
					color: foregroundHexColor
				}}
			>
				{number}
			</div>
			<div className={styles.routeInfo}>
				<span className={styles.headsign}>
					{name} {isAcrossStreet && <FaPersonWalkingDashedLineArrowRight className={styles.acrossStreetIcon} />}
				</span>
				<br />
				<span className={styles.direction}>{direction}</span>
			</div>
			<div className={styles.departureTimes}>
				{departureTimes &&
					departureTimes.map((time, index) => (
						<div className={`${departureTimeClasses} ${time.isHopper ? styles.hopper : ''} `} key={index}>
							<div className={styles.time}>
								{time.time}
								<div className={styles.realtimeIcon}>{time.isRealTime ? <RealTimeIcon color={darkMode ? 'white' : 'black'} /> : null}</div>
							</div>
							<div className={styles.timeSubtitle}>
								{time.isHopper && 'HOPPER'}
								{time.modifier && ' ' + time.modifier}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
