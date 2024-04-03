import { KioskObject } from '../types/KioskObjects';
import { HealthStatus } from '../types/HealthStatus';
import styles from './kioskStatusBadge.module.css';
import clsx from 'clsx';
import getStatus from '../helpers/getHealthStatus';
import { Suspense, useEffect, useState } from 'react';

interface KioskStatusBadgeProps {
	kioskObject: KioskObject;
	id: string;
}

export default function KioskStatusBadge({ kioskObject, id }: KioskStatusBadgeProps) {
	const [status, setStatus] = useState<HealthStatus>(HealthStatus.UNKNOWN);

	useEffect(() => {
		const updateHealth = async () => {
			const status = await getStatus(id, kioskObject);
			setStatus(status);
		};
		updateHealth();
		const interval = setInterval(updateHealth, 30000);

		return () => clearInterval(interval);
	}, [id, kioskObject]);

	// const status = await getStatus(kioskId, kioskObject);
	const indicatorLightClasses = clsx(styles.indicatorLight, {
		[styles.healthy]: status === HealthStatus.HEALTHY,
		[styles.warning]: status === HealthStatus.WARNING,
		[styles.critical]: status === HealthStatus.CRITICAL,
		[styles.unknown]: status === HealthStatus.UNKNOWN
	});
	return (
		<Suspense fallback={<KioskStatusBadgePlaceholder />}>
			<div className={styles.kioskStatusBadge}>
				<span className={indicatorLightClasses}></span>
				{KioskObject[kioskObject]} {HealthStatus[status].toLocaleLowerCase()}
			</div>
		</Suspense>
	);
}

function KioskStatusBadgePlaceholder() {
	return (
		<div className={styles.kioskStatusBadge}>
			<span className={styles.indicatorLight}></span>
			Loading...
		</div>
	);
}
