'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { connectionErrorState, departureState } from '../../../../state/kioskState';
import { getDepartures } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { useSearchParams } from 'next/navigation';

const DEPARTURES_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_DEPARTURES_UPDATE_INTERVAL ?? '');

if (!DEPARTURES_UPDATE_INTERVAL || isNaN(DEPARTURES_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_DEPARTURES_UPDATE_INTERVAL is not defined');
}

interface DepartureUpdaterProps {
	primaryStopId: string;
	additionalStopIds: string[];
	kioskId: string;
}

// static component that updates departures atom
export default function DepartureUpdater({ primaryStopId, additionalStopIds, kioskId }: DepartureUpdaterProps) {
	// only send a heartbeat (kioskId) if the heartbeat query param is true
	const params = useSearchParams();
	const heartbeat = params.get('heartbeat') === 'true';

	const setDepartures = useSetRecoilState(departureState);
	const setConnectionErrorState = useSetRecoilState(connectionErrorState);

	useEffect(() => {
		async function updateDepartures() {
			const departures = await getDepartures(primaryStopId, additionalStopIds, heartbeat ? kioskId : undefined);
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
	}, [setDepartures, setConnectionErrorState, kioskId, heartbeat, primaryStopId, additionalStopIds]);

	return null;
}
