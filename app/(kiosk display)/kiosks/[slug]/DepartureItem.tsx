import clsx from 'clsx';
import { FaPersonWalkingDashedLineArrowRight } from 'react-icons/fa6';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import styles from './DepartureItem.module.css';
import DepartureItemTime from './DepartureItemTime';

interface DepartureProps {
	route: GroupedRoute;
}

export default function DepartureItem({
	route: { number, name, backgroundHexColor, foregroundHexColor, isAcrossStreet, direction, departureTimes }
}: DepartureProps) {
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
				{departureTimes && departureTimes.map((time, index) => <DepartureItemTime time={time} index={index} key={index} />)}
			</div>
		</div>
	);
}
