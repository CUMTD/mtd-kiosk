import clsx from 'clsx';
import styles from './DepartureItem.module.css';
import { DepartureTime } from '../../../../types/kioskDisplayTypes/GroupedRoute';
import RealTimeIcon from './RealTimeIcon';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';

interface DepartureItemTimeProps {
	time: DepartureTime;
	index: number;
}

export default function DepartureItemTime({ time, index }: DepartureItemTimeProps) {
	const timeAsInt = parseInt(time.time.split(' ')[0]);
	const isDarkMode = useRecoilValue(darkModeState);
	const isSoon = time.time == 'DUE' || (!isNaN(timeAsInt) && timeAsInt < 5);

	const timeClasses = clsx('departure-time', styles.time, { [styles.soonDark]: isDarkMode && isSoon }, { [styles.soonLight]: !isDarkMode && isSoon });
	const departureTimeClasses = clsx('departureTime', styles.departureTime);
	const timeSubtitleClasses = clsx('timeSubtitle', styles.timeSubtitle);
	const realtimeIconClasses = clsx('realtimeIcon', styles.realtimeIcon);

	return (
		<div className={clsx(departureTimeClasses, { [styles.hopper]: time.isHopper })} key={index}>
			<div className={timeClasses}>
				<span>{time.time.split(' ')[0]}</span>
				<span className={styles.timeSuffix}>{time.time.split(' ')[1]?.replace('mins', 'min')}</span>
				<div className={realtimeIconClasses}>{time.isRealTime ? <RealTimeIcon color={isDarkMode ? 'white' : 'black'} /> : null}</div>
			</div>
			<div className={timeSubtitleClasses}>
				{time.isHopper && 'Hopper'}
				{time.modifier && ` ${time.modifier}`}
			</div>
		</div>
	);
}
