import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { RealTimeBusPosition } from '../../../../types/realtimeBusPosition';
import { departureState, kioskState } from '../../../../state/kioskState';
import { AdvancedMarker, AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import styles from './KioskAdMapBusMarkers.module.css';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import OccupancyIndicator from './OccupancyIndicator';

interface KioskAdMapBusMarkersProps {
	realTimeBusPositions: RealTimeBusPosition[] | null;
}

type BusMarkerState = {
	bus: RealTimeBusPosition;
	groupedRoute: GroupedRoute;
	isVisible: boolean; // Controls fade-in/out
};

export default function KioskAdMapBusMarkers({ realTimeBusPositions }: KioskAdMapBusMarkersProps) {
	const kiosk = useRecoilValue(kioskState);
	const departures = useRecoilValue(departureState);
	const [busMarkers, setBusMarkers] = useState<BusMarkerState[]>([]);

	useEffect(() => {
		if (!realTimeBusPositions) return;

		// Map current real-time positions to routes
		const newBusPositions = realTimeBusPositions
			.map((bus) => {
				const matchingRouteGroup = departures.find((departure) => departure.departureTimes.find((departureTime) => departureTime.tripId === bus.trip));

				if (matchingRouteGroup) {
					return { bus, groupedRoute: matchingRouteGroup, isVisible: true };
				}
				return null;
			})
			.filter((item): item is BusMarkerState => item !== null);

		// Update positions, add new buses, and mark disappeared buses
		setBusMarkers((prevMarkers) => {
			const updatedMarkers = prevMarkers.map((marker) => {
				const matchingNewBus = newBusPositions.find((newBus) => newBus.bus.id === marker.bus.id);

				if (matchingNewBus) {
					// Update position if bus still exists
					return { ...marker, bus: matchingNewBus.bus, groupedRoute: matchingNewBus.groupedRoute, isVisible: true };
				} else {
					// Mark bus as fading out if it's no longer in real-time positions

					// TODO: this will animate EVERY marker to transition into the kiosk location, which is not ideal
					// update this so that either it animated based on distance of the bus, or
					// it animates based on if the kiosk stop ID has been seen in the realtimePosition's currentStopID
					if (kiosk.location && kiosk.location.lat && kiosk.location.lng) {
						// change lat lng of marker to lat lng of kiosk.location to make a nice "suck in" animation
						return { ...marker, bus: { ...marker.bus, latitude: kiosk.location.lat, longitude: kiosk.location.lng }, isVisible: false };
					} else {
						return { ...marker, isVisible: false };
					}
				}
			});

			// Add buses that weren't in previous markers
			const newMarkers = newBusPositions.filter((newBus) => !prevMarkers.some((prevMarker) => prevMarker.bus.id === newBus.bus.id));

			return [...updatedMarkers, ...newMarkers];
		});
	}, [realTimeBusPositions, departures]);

	// Remove buses after fade-out transition
	useEffect(() => {
		const timeout = setTimeout(() => {
			setBusMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.isVisible));
		}, 5000); // Match this with your CSS transition time (5s)

		return () => clearTimeout(timeout);
	}, [busMarkers]);

	return (
		<>
			{busMarkers.map((marker) => (
				<KioskAdMapBusMarker key={marker.bus.id} busPosition={marker.bus} groupedRoute={marker.groupedRoute} isVisible={marker.isVisible} />
			))}
		</>
	);
}

interface KioskAdMapBusMarkerProps {
	busPosition: RealTimeBusPosition;
	groupedRoute: GroupedRoute;
	isVisible: boolean;
}

function KioskAdMapBusMarker({ busPosition, groupedRoute, isVisible }: KioskAdMapBusMarkerProps) {
	return (
		<AdvancedMarker
			key={busPosition.id}
			position={{ lat: busPosition.latitude, lng: busPosition.longitude }}
			anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
			className={`${styles.busMarker} ${isVisible ? styles.visible : styles.fadingOut}`}
			style={{
				backgroundColor: groupedRoute.backgroundHexColor,
				color: groupedRoute.foregroundHexColor
			}}
		>
			<OccupancyIndicator
				absolute
				occupancyStatus={busPosition.occupancyStatus ?? GtfsRealtimeBindings.transit_realtime.VehiclePosition.OccupancyStatus.NO_DATA_AVAILABLE}
			/>
			<div className={styles.number}>
				{groupedRoute.number}
				{groupedRoute.direction[0]}
				{/* <span style={{ fontSize: '0.5em', fontWeight: 'normal' }}>{busPosition.currentStopId}</span> */}
			</div>
		</AdvancedMarker>
	);
}
