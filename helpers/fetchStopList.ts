import type { GetStopsResponse } from '../types/getStopsResponse';
import throwError from './throwError';

const GET_STOPS_API_ENDPOINT = process.env.NEXT_PUBLIC_MTD_API_GET_STOPS_URL ?? throwError('Missing NEXT_PUBLIC_MTD_API_GET_STOPS_URL');

export default async function fetchStopList() {
	var response = null;
	try {
		console.log('querying api for stops');
		response = await fetch(GET_STOPS_API_ENDPOINT, { cache: 'force-cache' });
	} catch (error) {
		console.error(error);
	}

	if (response && response.ok) {
		// return body as GetStopsResponse
		const allStops = (await response.json()) as GetStopsResponse;

		// convert the original stops to Option[]
		const parent_stops = allStops.stops.map(({ stop_id, stop_name }) => ({ title: stop_name, value: stop_id }));

		// flatten the stops to an array of stop_points
		const stops = allStops.stops.map((stop) => stop.stop_points).flat();

		// convert the stop_points to Option[]
		const boarding_points = stops.map(({ stop_id, stop_name }) => ({ title: stop_name, value: stop_id }));

		// combine the parent stops and boarding points and sort by stop_id so LSE is above LSE:1 and LSE:2 etc
		const combined = [...parent_stops, ...boarding_points].sort((a, b) => a.value.localeCompare(b.value));

		return combined;
	} else {
		console.error('Failed to fetch stop list');
		return null;
	}
}
