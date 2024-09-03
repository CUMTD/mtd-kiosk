import { KioskObject } from '../types/KioskObjects';
import { HealthStatus } from '../types/HealthStatus';
import styles from './kioskStatusBadge.module.css';
import clsx from 'clsx';

interface KioskStatusBadgeProps {
	kioskObject: KioskObject;
	status?: HealthStatus;
	large?: boolean;
	align: 'left' | 'right';
}

export default function KioskStatusBadge({ kioskObject, status, large, align }: KioskStatusBadgeProps) {
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
		// <Suspense fallback={<KioskStatusBadgePlaceholder />}>
		<>
			{status === undefined ? (
				<KioskStatusBadgePlaceholder />
			) : (
				<div className={containerClasses}>
					{align === 'left' && <span className={indicatorLightClasses}></span>}
					{KioskObject[kioskObject]} {status === undefined ? 'unknown' : HealthStatus[status].toLocaleLowerCase()}
					{align === 'right' && <span className={indicatorLightClasses}></span>}
				</div>
			)}
		</>
		// </Suspense>
	);
}

function KioskStatusBadgePlaceholder() {
	return (
		<div className={styles.kioskStatusBadge}>
			Unknown
			<span className={styles.indicatorLight}></span>
		</div>
	);
}
