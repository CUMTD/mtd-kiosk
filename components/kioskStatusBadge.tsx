import { KioskObject } from '../types/KioskObjects';
import { HealthStatus } from '../types/HealthStatus';
import styles from './kioskStatusBadge.module.css';
import clsx from 'clsx';

interface KioskStatusBadgeProps {
	kioskObject: KioskObject;
	status?: HealthStatus;
	large?: boolean;
}

export default function KioskStatusBadge({ kioskObject, status, large }: KioskStatusBadgeProps) {
	// const status = await getStatus(kioskId, kioskObject);
	const indicatorLightClasses = clsx(styles.indicatorLight, {
		[styles.healthy]: status === HealthStatus.HEALTHY,
		[styles.warning]: status === HealthStatus.WARNING,
		[styles.critical]: status === HealthStatus.CRITICAL,
		[styles.unknown]: status === HealthStatus.UNKNOWN
	});

	return (
		// <Suspense fallback={<KioskStatusBadgePlaceholder />}>
		<>
			{status === undefined ? (
				<KioskStatusBadgePlaceholder />
			) : (
				<div className={styles.kioskStatusBadge}>
					<span className={indicatorLightClasses}></span>
					{KioskObject[kioskObject]} {status === undefined ? 'unknown' : HealthStatus[status].toLocaleLowerCase()}
				</div>
			)}
		</>
		// </Suspense>
	);
}

function KioskStatusBadgePlaceholder() {
	return (
		<div className={styles.kioskStatusBadge}>
			<span className={styles.indicatorLight}></span>
			Unknown
		</div>
	);
}
