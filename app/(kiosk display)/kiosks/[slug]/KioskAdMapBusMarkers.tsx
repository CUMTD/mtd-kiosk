import { useRecoilValue } from 'recoil';
import { RealTimeBusPosition } from '../../../../types/realtimeBusPosition';
import { departureState } from '../../../../state/kioskState';
import { AdvancedMarker, AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import { FaBus } from 'react-icons/fa6';
import styles from './KioskAdMapBusMarkers.module.css';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import { BsPerson, BsPersonFill } from 'react-icons/bs';

interface KioskAdMapBusMarkersProps {
	realTimeBusPositions: RealTimeBusPosition[] | null;
}

export default function KioskAdMapBusMarkers({ realTimeBusPositions }: KioskAdMapBusMarkersProps) {
	console.log('realTimeBusPositions', realTimeBusPositions);
	const departures = useRecoilValue(departureState);
	if (!realTimeBusPositions) {
		return null;
	}

	console.log(departures);
	const busPositionToGroupedRoute = realTimeBusPositions
		.map((bus) => {
			// first try to match the trip id for most accurate result, then fallback to vehicle id (example: someone at IT platform C is waiting for a 12E, but it is currently loggrf in as a 12W)

			let matchingRouteGroup = departures.find((departure) => departure.departureTimes.find((departureTime) => departureTime.tripId === bus.trip));
			// if (!matchingRouteGroup) {
			// 	matchingRouteGroup = departures.find((departure) => departure.departureTimes.find((departureTime) => departureTime.vehicleId === bus.id));
			// }
			return { bus, matchingRouteGroup: matchingRouteGroup };
		})
		.filter((item) => item.matchingRouteGroup);

	return (
		<>
			{busPositionToGroupedRoute.map((item) => (
				<KioskAdMapBusMarker key={item.bus.id} busPosition={item.bus} groupedRoute={item.matchingRouteGroup!} />
			))}
		</>
	);
}

interface KioskAdMapBusMarkerProps {
	busPosition: RealTimeBusPosition;
	groupedRoute: GroupedRoute;
}

function KioskAdMapBusMarker({ busPosition, groupedRoute }: KioskAdMapBusMarkerProps) {
	console.log(groupedRoute.name, groupedRoute.direction, busPosition.id);

	return (
		<AdvancedMarker
			key={busPosition.id}
			position={{ lat: busPosition.latitude, lng: busPosition.longitude }}
			anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
			className={styles.busMarker}
			style={{
				backgroundColor: groupedRoute.backgroundHexColor,
				color: groupedRoute.foregroundHexColor
			}}
		>
			<OccupancyIndicator
				occupancyStatus={busPosition.occupancyStatus ?? GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NO_DATA_AVAILABLE}
				backgroundHexColor={groupedRoute.backgroundHexColor}
			/>
			<div className={styles.number}>
				{groupedRoute.number}
				{groupedRoute.direction[0]}
			</div>
			{/* <div className={styles.route}>
				<span className={styles.routeName}>
					{groupedRoute.name} <br />
				</span>
				<span className={styles.direction}>{groupedRoute.direction}</span>
			</div> */}
		</AdvancedMarker>
	);
}
interface OccupancyIndicatorProps {
	occupancyStatus: number;
	backgroundHexColor?: string;
}

function OccupancyIndicator({ occupancyStatus, backgroundHexColor }: OccupancyIndicatorProps) {
	if (occupancyStatus === GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NO_DATA_AVAILABLE) {
		return null;
	}

	if (occupancyStatus === GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.CRUSHED_STANDING_ROOM_ONLY) {
		return 'FULL';
	}
	return (
		<div className={styles.occupancyIndicator} style={{ backgroundColor: backgroundHexColor }}>
			{occupancyStatus > 0 ? <BsPersonFill /> : <BsPerson />}
			{occupancyStatus > 2 ? <BsPersonFill /> : <BsPerson />}
			{occupancyStatus > 4 ? <BsPersonFill /> : <BsPerson />}
		</div>
	);
}

function occupancyStatusToString(occupancyStatus: number) {
	let occupancyStatusString = '';
	switch (occupancyStatus) {
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.EMPTY:
			occupancyStatusString = 'Empty';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.MANY_SEATS_AVAILABLE:
			occupancyStatusString = 'Many seats available';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.FEW_SEATS_AVAILABLE:
			occupancyStatusString = 'Few seats available';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.STANDING_ROOM_ONLY:
			occupancyStatusString = 'Standing room only';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.CRUSHED_STANDING_ROOM_ONLY:
			occupancyStatusString = 'Crushed standing room only';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.FULL:
			occupancyStatusString = 'Full';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NOT_ACCEPTING_PASSENGERS:
			occupancyStatusString = 'Not accepting passengers';
			break;
		case GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NO_DATA_AVAILABLE:
			occupancyStatusString = 'No data';
			break;
		default:
			occupancyStatusString = 'Unknown';
			break;
	}

	return occupancyStatusString;
}
