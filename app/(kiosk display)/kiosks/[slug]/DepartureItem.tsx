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
		<div className={classes} style={{ animationDelay: `${Math.random() * 0.5}s` }}>
			{/* <div className={styles.realtimeIcon}>
				{!departure.departureTimes[0].includes(':') ? (
					departure.foregroundHexColor.toUpperCase().includes('0') ? (
						<RealTimeIcon color="black" />
					) : (
						<RealTimeIcon color="white" />
					)
				) : null}
			</div> */}
			<div className={styles.departureItemContent} style={{ backgroundColor: departure.backgroundHexColor, color: departure.foregroundHexColor }}>
				<div
					className={styles.routeNumber}
					style={{
						backgroundColor: departure.backgroundHexColor,
						color: departure.foregroundHexColor,
						fontSize: departure.routeNumber.length > 2 ? '80px' : '95px'
					}}
				>
					{departure.routeNumber}
				</div>
				<div className={styles.routeInfo}>
					<span className={styles.headsign}>{departure.headsign}</span>
					<br />
					<span className={styles.direction}>{departure.direction}</span>
				</div>
				<div className={styles.departureTimes}>
					<span className={styles.firstTime}>
						{!departure.departureTimes[0].includes(':') ? (
							departure.foregroundHexColor.toUpperCase().includes('0') ? (
								<RealTimeIcon color="black" />
							) : (
								<RealTimeIcon color="white" />
							)
						) : null}{' '}
						{departure.departureTimes[0]} {/* todo: this is a stupid way to do this. type it out properly. */}
					</span>
					<span className={styles.secondTime}>
						{departure.departureTimes[1]}, {departure.departureTimes[2]}
					</span>
				</div>
			</div>
		</div>
	);
}
