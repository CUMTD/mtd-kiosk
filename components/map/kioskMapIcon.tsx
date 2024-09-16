'use client';

import clsx from 'clsx';
import { HealthStatus } from '../../types/HealthStatus';
import styles from './kioskMapIcon.module.css';
import { useRecoilValue } from 'recoil';
import { focusedKioskIdState } from '../../state/sidebarState';

interface KioskMapIconProps {
	id: string;
	focusedKioskId?: string;
	health?: HealthStatus;
	openIssuesCount: number;
}

export default function KioskMapIcon({ id, health = HealthStatus.UNKNOWN, openIssuesCount }: KioskMapIconProps) {
	const focusedKioskId = useRecoilValue(focusedKioskIdState);
	const classes = clsx(styles.icon, {
		[styles.healthy]: health === HealthStatus.HEALTHY,
		[styles.warning]: health === HealthStatus.WARNING,
		[styles.critical]: health === HealthStatus.CRITICAL,
		[styles.focused]: focusedKioskId === id
	});

	return <div className={classes}>{openIssuesCount > 0 && openIssuesCount}</div>;
}
