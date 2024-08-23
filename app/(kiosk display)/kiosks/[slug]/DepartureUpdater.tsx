'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { connectionErrorState, departureState, generalMessageState } from '../../../../state/kioskState';
import { getDepartures } from '../../../../helpers/httpMethods';

interface Props {
	stopId: string;
	kioskId: string;
}

// static component that updates departures atom
export default function DepartureUpdater({ stopId, kioskId }: Props) {
	const setDepartures = useSetRecoilState(departureState);
	const setGeneralMessage = useSetRecoilState(generalMessageState);
	const setConnectionErrorState = useSetRecoilState(connectionErrorState);

	useEffect(() => {
		async function updateDepartures(_stopId: string) {
			const departures = await getDepartures(stopId, kioskId);
			if (!departures) {
				setConnectionErrorState(true);
				return;
			}
			setDepartures(departures.routes);
			setGeneralMessage(departures.generalMessage);
			setConnectionErrorState(false);
		}
		updateDepartures(stopId);
		const timer = setInterval(updateDepartures, 30_000);

		return () => clearInterval(timer);
	}, [stopId, setDepartures, setGeneralMessage, setConnectionErrorState, kioskId]);

	return null;
}
