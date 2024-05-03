import clsx from 'clsx';
import styles from './kioskMapIcon.module.css';
import { useRecoilValue } from 'recoil';
import { focusedKioskIdState } from '../state/mapState';
import { HealthStatus } from '../types/HealthStatus';
import { useEffect, useState } from 'react';
import getHealthStatuses from '../helpers/httpMethods';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import { showProblemsOnlyState } from '../state/kioskState';

interface KioskMapIconProps {
	id: string;
}

export default function KioskMapIcon({ id }: KioskMapIconProps) {
	const [healthStatus, setHealthStatus] = useState<ServerHealthStatuses>();
	const showProblemsOnly = useRecoilValue(showProblemsOnlyState);

	useEffect(() => {
		async function fetchHealthStatus() {
			const healthStatuses = await getHealthStatuses(id);
			if (healthStatuses) setHealthStatus(healthStatuses);
		}
		fetchHealthStatus();
		setTimeout(() => fetchHealthStatus(), 10000);
	}, [id]);

	const focusedKiosk = useRecoilValue(focusedKioskIdState);

	const classes = clsx(styles.icon, {
		[styles.healthy]: healthStatus?.overallHealth === HealthStatus.HEALTHY,
		[styles.warning]: healthStatus?.overallHealth === HealthStatus.WARNING,
		[styles.critical]: healthStatus?.overallHealth === HealthStatus.CRITICAL,
		[styles.focused]: focusedKiosk === id
	});

	if (showProblemsOnly && healthStatus?.overallHealth === HealthStatus.HEALTHY) return null;

	return <div className={classes}></div>;
}
