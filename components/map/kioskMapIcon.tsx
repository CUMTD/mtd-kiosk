'use client';

import clsx from 'clsx';
import { HealthStatus } from '../../types/HealthStatus';
import styles from './kioskMapIcon.module.css';

interface KioskMapIconProps {
	id: string;
	focusedKioskId?: string;
	health?: HealthStatus;
	openIssuesCount: number;
}

export default function KioskMapIcon({ id, focusedKioskId, health = HealthStatus.UNKNOWN, openIssuesCount }: KioskMapIconProps) {
	const classes = clsx(styles.icon, {
		[styles.healthy]: health === HealthStatus.HEALTHY,
		[styles.warning]: health === HealthStatus.WARNING,
		[styles.critical]: health === HealthStatus.CRITICAL,
		[styles.focused]: focusedKioskId === id
	});

	return <div className={classes}>{openIssuesCount > 0 && openIssuesCount}</div>;
}
