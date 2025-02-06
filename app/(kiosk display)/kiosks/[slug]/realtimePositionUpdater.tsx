'use client';

import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import throwError from '../../../../helpers/throwError';
import { kioskState } from '../../../../state/kioskState';
import { busPositionsState } from '../../../../state/realtimeBusPositionState';
import { getRealtimePositions } from '../../../../helpers/grpcMethods';

const REALTIME_POSITION_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_REALTIME_POSITION_UPDATE_INTERVAL ?? '');

if (!REALTIME_POSITION_UPDATE_INTERVAL || isNaN(REALTIME_POSITION_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_REALTIME_POSITION_UPDATE_INTERVAL is not defined');
}

export default function RealtimePositionUpdater() {
	const { _id: id, stopId, additionalStopIds } = useRecoilValue(kioskState);

	const setBusPositions = useSetRecoilState(busPositionsState);

	useEffect(() => {
		async function updateBusPositions() {
			if (!stopId || stopId.length === 0) {
				console.warn('No stop ID provided');
				return;
			}

			const busPositions = await getRealtimePositions();
			// console.log('busPositions');
			setBusPositions(busPositions);
		}
		updateBusPositions();
		const timer = setInterval(updateBusPositions, REALTIME_POSITION_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [setBusPositions, additionalStopIds, stopId, id]);

	return null;
}
