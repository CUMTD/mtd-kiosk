import { AdvancedMarker, AdvancedMarkerAnchorPoint, APIProvider, limitTiltRange, Map, Pin, RenderingType, useMap } from '@vis.gl/react-google-maps';
import throwError from '../../../../helpers/throwError';
import { useRecoilValue } from 'recoil';
import { departureState, kioskState } from '../../../../state/kioskState';
import { busPositionsState, routePolylinesState } from '../../../../state/realtimeBusPositionState';
import styles from './KioskAdMap.module.css';
import Image from 'next/image';
import KioskAdMapBusMarkers from './KioskAdMapBusMarkers';
import OccupancyLegend from './OccupancyLegend';
import RouteOverlays from './RouteOverlays';

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not defined');

export default function BusRealtimeMap() {
	const kiosk = useRecoilValue(kioskState);
	const realTimeBusPositions = useRecoilValue(busPositionsState);
	const departures = useRecoilValue(departureState);
	const tripIdstoEncodedPolyline = useRecoilValue(routePolylinesState);

	// flatten departures into a list of unique tripIds

	// console.log('departures', departures);

	if (!kiosk.location || !kiosk.location.lat || !kiosk.location.lng) {
		return null;
	}
	const heading = 0;
	const zoom = 15;

	return (
		<APIProvider apiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<Map
				style={{ width: '100%', height: '100%' }}
				defaultCenter={{ lat: kiosk.location.lat, lng: kiosk.location.lng }}
				// 51.5072° N, 0.1276° W
				// center={{ lat: 51.5072, lng: -0.1276 }}
				defaultZoom={zoom}
				gestureHandling={'greedy'}
				// clickableIcons={false}
				// disableDefaultUI={true}
				mapId={'e70e48099570facb'}
				// draggableCursor={null}
				// draggingCursor={null}
				heading={heading}
				renderingType={RenderingType.VECTOR}
				keyboardShortcuts={false}
			>
				<RouteOverlays />
				<CompassRose heading={heading} />
				<OccupancyLegend />
				{/* <TransitLayer /> */}
				<AdvancedMarker
					position={{ lat: kiosk.location.lat, lng: kiosk.location.lng }}
					zIndex={1000}
					anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
					className={styles.currentLocation}
				>
					{''}
				</AdvancedMarker>
				{/* TODO: this is so sloppy, must fix */}
				<KioskAdMapBusMarkers realTimeBusPositions={realTimeBusPositions} />
			</Map>
		</APIProvider>
	);
}

interface CompassRoseProps {
	heading: number;
}

function CompassRose({ heading }: CompassRoseProps) {
	return <Image src={'/rose.svg'} width={50} height={50} alt="" style={{ transform: `rotate(${-heading}deg)` }} className={styles.compassRose} />;
}

function TransitLayer() {
	const map = useMap();
	const transitLayer = new google.maps.TransitLayer();
	transitLayer.setMap(map);

	return null;
}
