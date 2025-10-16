import clsx from 'clsx';
import styles from './DepartureItem.module.css';
import { DepartureTime } from '../../../../types/kioskDisplayTypes/GroupedRoute';
import RealTimeIcon from './RealTimeIcon';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';

interface DepartureItemTimeProps {
	departureTime: DepartureTime;
	index: number;
}

export default function DepartureItemTime({ departureTime: { time, isHopper, isRealTime, modifier } }: DepartureItemTimeProps) {
	const timeAsInt = parseInt(time.split(' ')[0]);
	const isDarkMode = useRecoilValue(darkModeState);
	const isDue = time == 'DUE';
	const isSoon = isRealTime && (isDue || (!isNaN(timeAsInt) && timeAsInt < 5));

	const timeClasses = clsx(
		'departure-time',
		styles.time,
		{ [styles.due]: isDue },
		{ [styles.soonDark]: isDarkMode && isSoon },
		{ [styles.soonLight]: !isDarkMode && isSoon }
	);
	const departureTimeClasses = clsx('departureTime', styles.departureTime);
	const timeSubtitleClasses = clsx('timeSubtitle', styles.timeSubtitle);
	const realtimeIconClasses = clsx('realtimeIcon', styles.realtimeIcon);

	return (
		<div className={clsx(departureTimeClasses, { [styles.hopper]: isHopper })} key={`${time}-${isHopper}-${modifier}`}>
			<div className={timeClasses}>
				<span>{time.split(' ')[0]}</span>
				<span className={styles.timeSuffix}>{time.split(' ')[1]?.replace('mins', 'min')}</span>
				<div className={realtimeIconClasses}>{isRealTime ? <RealTimeIcon color={isDarkMode ? 'white' : 'black'} /> : null}</div>
			</div>
			<div className={timeSubtitleClasses}>
				{isHopper && 'Hopper'}
				{modifier && ` ${modifier}`}
			</div>
		</div>
	);
}
