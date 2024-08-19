import clsx from 'clsx';
import Departure from '../../../../types/kioskDisplayTypes/Departure';
import styles from './DepartureItem.module.css';
import RealTimeIcon from './RealTimeIcon';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { BsFastForwardCircleFill } from 'react-icons/bs';

interface DepartureProps {
	departure: Departure;
	skeleton?: boolean;
}

export default function DepartureItem({ departure, skeleton }: DepartureProps) {
	const classes = clsx(styles.departureItem, {
		[styles.skeleton]: skeleton
	});

	return (
		<div className={classes} style={{ animationDelay: `${Math.random() * 0.1}s` }}>
			<div className={styles.realtimeIcon}>{departure.departureTimes[0].isRealTime ? <RealTimeIcon color="white" /> : null}</div>
			<div
				className={styles.routeNumber}
				style={{
					backgroundColor: departure.backgroundHexColor,
					color: departure.foregroundHexColor
					// fontSize: departure.routeNumber.length > 2 ? '80px' : '95px'
				}}
			>
				{departure.routeNumber}
			</div>
			<div className={styles.departureItemContent}>
				<div className={styles.routeInfo}>
					<span className={styles.headsign}>{departure.headsign}</span>
					<br />
					<span className={styles.direction}>{departure.direction}</span>
				</div>
				<div className={styles.departureTimes}>
					<div className={styles.firstTime}>
						{departure.departureTimes[0].isHopper && <HopperIcon backgroundColor={departure.backgroundHexColor} textColor={departure.foregroundHexColor} />}{' '}
						{departure.departureTimes[0].time}
					</div>
					<div className={styles.secondTime}>
						{departure.departureTimes[1].isHopper && <HopperIcon backgroundColor={departure.backgroundHexColor} textColor={departure.foregroundHexColor} />}{' '}
						{departure.departureTimes[1].time}
					</div>
				</div>
			</div>
		</div>
	);
}

interface HopperIconProps {
	textColor: string;
	backgroundColor: string;
}
function HopperIcon({ textColor, backgroundColor }: HopperIconProps) {
	return <span className={styles.hopperIcon}>HOPPER</span>;
}
