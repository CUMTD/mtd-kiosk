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

interface Props {
	stopId: string;
	kioskId: string;
}

// static component that updates departures atom
export default function DepartureUpdater({ stopId, kioskId }: Props) {
	// only send a heartbeat (kioskId) if the heartbeat query param is true
	const params = useSearchParams();
	const heartbeat = params.get('heartbeat') === 'true';

	const setDepartures = useSetRecoilState(departureState);
	const setConnectionErrorState = useSetRecoilState(connectionErrorState);

	useEffect(() => {
		async function updateDepartures(_stopId: string) {
			const departures = await getDepartures(stopId, heartbeat ? kioskId : undefined);
			if (!departures) {
				setConnectionErrorState(true);
				return;
			}
			setDepartures(departures);
			setConnectionErrorState(false);
		}
		updateDepartures(stopId);
		const timer = setInterval(updateDepartures, DEPARTURES_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [stopId, setDepartures, setConnectionErrorState, kioskId, heartbeat]);

	return null;
}
