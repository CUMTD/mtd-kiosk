import clsx from 'clsx';
import { HealthStatus } from '../types/HealthStatus';
import { KioskObject } from '../types/KioskObjects';
import styles from './kioskStatusBadge.module.css';

interface KioskStatusBadgeProps {
	kioskObject: KioskObject;
	status?: HealthStatus;
	align: 'left' | 'right';
}

export default function KioskStatusBadge({ kioskObject, status = HealthStatus.UNKNOWN, align }: KioskStatusBadgeProps) {
	const indicatorLightClasses = clsx(styles.indicatorLight, {
		[styles.healthy]: status === HealthStatus.HEALTHY,
		[styles.warning]: status === HealthStatus.WARNING,
		[styles.critical]: status === HealthStatus.CRITICAL,
		[styles.unknown]: status === HealthStatus.UNKNOWN
	});

	const containerClasses = clsx(styles.kioskStatusBadge, {
		[styles.left]: align === 'left',
		[styles.right]: align === 'right'
	});

	return (
		<div className={containerClasses}>
			{align === 'left' && <span className={indicatorLightClasses}></span>}
			{KioskObject[kioskObject]} {status === undefined ? 'unknown' : HealthStatus[status].toLocaleLowerCase()}
			{align === 'right' && <span className={indicatorLightClasses}></span>}
		</div>
	);
}
