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
						<div className={`${styles.departureTime} ${time.isHopper ? styles.hopper : ''} `} key={index}>
							<div className={styles.time}>
								{time.time}
								<div className={styles.realtimeIcon}>{time.isRealTime ? <RealTimeIcon color={darkMode ? 'white' : 'black'} /> : null}</div>
							</div>
							<div className={styles.timeSubtitle}>{time.isHopper && 'HOPPER'}</div>
						</div>
					))}
			</div>
		</div>
	);
}
