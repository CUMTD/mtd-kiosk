'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { getHealthStatuses } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { kioskHealthStatusesState } from '../../../../state/sidebarState';

const HEALTH_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_HEALTH_FETCH_INTERVAL ?? throwError('NEXT_PUBLIC_HEALTH_FETCH_INTERVAL is not defined'), 10);

export default function KioskHealthUpdater() {
	const setKioskHealthStatuses = useSetRecoilState(kioskHealthStatusesState);

	useEffect(() => {
		async function updateHealthStatus() {
			const healthStatuses = await getHealthStatuses();
			if (healthStatuses) {
				setKioskHealthStatuses(healthStatuses);
			}
		}
		const timer = setInterval(updateHealthStatus, HEALTH_FETCH_INTERVAL);
		return () => clearInterval(timer);
	}, [setKioskHealthStatuses]);

	return null;
}
