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

	const departureItemClasses = clsx({
		['departureItem']: true,
		[styles.departureItem]: true
	});

	const routeNumberClasses = clsx({
		['routeNumber']: true,
		[styles.routeNumber]: true,
		[styles.smallRouteNumber]: number.length > 2
	});

	const routeInfoClasses = clsx('routeInfo', styles.routeInfo);
	const directionClasses = clsx('direction', styles.direction);
	const departureTimesClasses = clsx('departureTimes', styles.departureTimes);
	const timeClasses = clsx('departure-time', styles.time);
	const departureTimeClasses = clsx('departureTime', styles.departureTime);
	const timeSubtitleClasses = clsx('timeSubtitle', styles.timeSubtitle);
	const realtimeIconClasses = clsx('realtimeIcon', styles.realtimeIcon);

	return (
		<div className={departureItemClasses}>
			<div
				className={routeNumberClasses}
				style={{
					backgroundColor: backgroundHexColor,
					color: foregroundHexColor
				}}
			>
				{number}
			</div>
			<div className={routeInfoClasses}>
				<span className={styles.headsign}>
					{name} {isAcrossStreet && <FaPersonWalkingDashedLineArrowRight className={styles.acrossStreetIcon} />}
				</span>
				<br />
				<span className={directionClasses}>{direction}</span>
			</div>
			<div className={departureTimesClasses}>
				{departureTimes &&
					departureTimes.map((time, index) => (
						<div className={`${departureTimeClasses} ${time.isHopper ? styles.hopper : ''} `} key={index}>
							<div className={timeClasses}>
								{time.time}
								<div className={realtimeIconClasses}>{time.isRealTime ? <RealTimeIcon color={darkMode ? 'white' : 'black'} /> : null}</div>
							</div>
							<div className={timeSubtitleClasses}>{time.isHopper && 'HOPPER'}</div>
						</div>
					))}
			</div>
		</div>
	);
}
