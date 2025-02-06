import { RealTimeBusPosition } from '../types/realtimeBusPosition';
import throwError from './throwError';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

const GTFS_RT_VEHICLE_POSITIONS_URL =
	process.env.NEXT_PUBLIC_GTFS_RT_VEHICLE_POSITIONS_URL ?? throwError('NEXT_PUBLIC_GTFS_RT_VEHICLE_POSITIONS_URL is not defined');

export async function getRealtimePositions(): Promise<RealTimeBusPosition[] | null> {
	try {
		const response = await fetch(GTFS_RT_VEHICLE_POSITIONS_URL, {});
		if (!response.ok) {
			const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
			throw error;
		}
		const buffer = await response.arrayBuffer();
		const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
		// console.log(feed);

		const positions: RealTimeBusPosition[] = feed.entity
			.map((entity) => {
				const vehicle = entity.vehicle;
				if (!vehicle) {
					return null;
				}
				const position = vehicle.position;
				if (!position) {
					return null;
				}
				vehicle.stopId;
				const busPosition: RealTimeBusPosition = {
					id: vehicle.vehicle?.id,
					latitude: position.latitude,
					longitude: position.longitude,
					bearing: position.bearing,
					speed: position.speed,
					trip: vehicle.trip?.tripId,
					routeId: vehicle.trip?.routeId,
					occupancyStatus: vehicle.occupancyStatus,
					currentStopId: vehicle.stopId
				};

				return busPosition;
			})
			.filter((position): position is RealTimeBusPosition => position !== null);

		return positions;
	} catch (error) {
		console.log(error);
	}
	return null;
}
