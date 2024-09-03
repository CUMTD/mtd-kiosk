import clsx from 'clsx';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import styles from './DepartureItem.module.css';
import RealTimeIcon from './RealTimeIcon';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';

interface DepartureProps {
	route: GroupedRoute;
}

export default function DepartureItem({ route }: DepartureProps) {
	const darkMode = useRecoilValue(darkModeState);
	return (
		<div className={styles.departureItem} style={{ animationDelay: `${Math.random() * 0.1}s` }}>
			<div
				className={styles.routeNumber}
				style={{
					backgroundColor: route.backgroundHexColor,
					color: route.foregroundHexColor
				}}
			>
				{route.number}
			</div>
			<div className={styles.routeInfo}>
				<span className={styles.headsign}>{route.name}</span>
				<br />
				<span className={styles.direction}>{route.direction}</span>
			</div>
			<div className={styles.departureTimes}>
				{route.departureTimes &&
					route.departureTimes.map((time, index) => (
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

export function DepartureItemSkeleton() {
	const classes = clsx(styles.departureItem, styles.skeleton);

	return <div className={classes}></div>;
}