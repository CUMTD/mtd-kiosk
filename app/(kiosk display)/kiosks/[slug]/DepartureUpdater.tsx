'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getDepartures } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { connectionErrorState, departureState, kioskState } from '../../../../state/kioskState';

const DEPARTURES_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_DEPARTURES_UPDATE_INTERVAL ?? '');

if (!DEPARTURES_UPDATE_INTERVAL || isNaN(DEPARTURES_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_DEPARTURES_UPDATE_INTERVAL is not defined');
}

// static component that updates departures atom
export default function DepartureUpdater() {
	const { _id: id, stopId, additionalStopIds } = useRecoilValue(kioskState);

	// only send a heartbeat (kioskId) if the heartbeat query param is true
	const params = useSearchParams();
	const heartbeat = params.get('heartbeat') === 'true';

	const setDepartures = useSetRecoilState(departureState);
	const setConnectionErrorState = useSetRecoilState(connectionErrorState);

	useEffect(() => {
		async function updateDepartures() {
			if (!stopId || stopId.length === 0) {
				console.warn('No stop ID provided');
				return;
			}

			const departures = await getDepartures(stopId, additionalStopIds ?? [], heartbeat ? id : undefined);

			if (!departures) {
				setConnectionErrorState(true);
				return;
			}
			setDepartures(departures);
			setConnectionErrorState(false);
		}
		updateDepartures();
		const timer = setInterval(updateDepartures, DEPARTURES_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [setDepartures, setConnectionErrorState, heartbeat, additionalStopIds, stopId, id]);

	return null;
}
