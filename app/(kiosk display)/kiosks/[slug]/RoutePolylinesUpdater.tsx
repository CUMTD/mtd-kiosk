import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getEncodedTripPolylines } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { departureState } from '../../../../state/kioskState';
import { routePolylinesState } from '../../../../state/realtimeBusPositionState';

const ROUTE_POLYLINES_FETCH_INTERVAL = parseInt(
	process.env.NEXT_PUBLIC_ROUTE_POLYLINES_FETCH_INTERVAL ?? throwError('NEXT_PUBLIC_ROUTE_POLYLINES_FETCH_INTERVAL is not defined'),
	10
);

export default function RoutePolylinesUpdater() {
	const setRoutePolylines = useSetRecoilState(routePolylinesState);
	const departures = useRecoilValue(departureState);
	// this does not get unique values
	const tripIds = departures.flatMap((departure) => departure.departureTimes.map((departureTime) => departureTime.tripId));

	//this does:
	// const tripIds = Array.from(new Set(departures.flatMap((departure) => departure.departureTimes.map((departureTime) => departureTime.tripId))));
	// console.log('tripIds', tripIds);
	useEffect(() => {
		async function updateRoutePolylines() {
			// console.log('tripIds', tripIds);
			const tripIdstoEncodedPolylines = await getEncodedTripPolylines(tripIds);
			// console.log('tripIdstoEncodedPolylines', tripIdstoEncodedPolylines);
			setRoutePolylines(tripIdstoEncodedPolylines);
		}
		updateRoutePolylines();
		const timer = setInterval(updateRoutePolylines, ROUTE_POLYLINES_FETCH_INTERVAL);
		return () => clearInterval(timer);
	}, []);

	return null;
}
