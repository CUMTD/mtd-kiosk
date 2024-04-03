import clsx from 'clsx';
import styles from './kioskMapIcon.module.css';
import { useRecoilValue } from 'recoil';
import { focusedKioskIdState } from '../state/mapState';
import { HealthStatus } from '../types/HealthStatus';

interface KioskMapIconProps {
	status: HealthStatus;
	id: string;
}

export default function KioskMapIcon({ status, id }: KioskMapIconProps) {
	const focusedKiosk = useRecoilValue(focusedKioskIdState);

	const classes = clsx(styles.icon, {
		[styles.healthy]: status === HealthStatus.HEALTHY,
		[styles.warning]: status === HealthStatus.WARNING,
		[styles.critical]: status === HealthStatus.CRITICAL,
		[styles.focused]: focusedKiosk === id
	});

	return <div className={classes}></div>;
}
