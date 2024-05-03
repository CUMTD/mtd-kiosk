/// <reference types="google.maps" />
'use client';
import {
	APIProvider,
	AdvancedMarker,
	InfoWindow,
	Map,
	MapCameraChangedEvent,
	MapMouseEvent,
	Marker,
	useAdvancedMarkerRef,
	useMap
} from '@vis.gl/react-google-maps';
import { client } from '../sanity/lib/client';
import kiosk, { Kiosk } from '../sanity/schemas/documents/kiosk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { focusedKioskIdState, showMapState } from '../state/mapState';
import { useRouter } from 'next/navigation';
import styles from './kioskMap.module.css';
import throwError from '../helpers/throwError';
import KioskMapIcon from './kioskMapIcon';
import { HealthStatus } from '../types/HealthStatus';
import { MapOptions } from 'google-map-react';
import { LatLng } from '@sanity/google-maps-input';
import KioskCard from './kioskCard';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

export default function KioskMap() {
	const router = useRouter();
	const showMap = useRecoilValue(showMapState);

	const [focusedKioskId, setFocusedKioskIdState] = useRecoilState(focusedKioskIdState);

	const query = `*[_type == 'kiosk'] {location, _id}`;
	const [kiosks, setKiosks] = useState<Kiosk[]>([]);

	useEffect(() => {
		async function fetchKiosks() {
			const kiosks: Kiosk[] = await client.fetch(query);
			setKiosks(kiosks);
		}
		fetchKiosks();
	}, [query]);

	const def_position = { lat: 40.11464841024296, lng: -88.22875539000833 };

	const [currentPosition, setCurrentPosition] = useState(def_position);

	const handleMapClick = useCallback((event: MapMouseEvent) => {
		if (!event.detail.placeId) {
			setFocusedKioskIdState(null);
		}
	}, []);

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<aside className={styles.mapContainer}>
				<Map
					defaultCenter={currentPosition}
					defaultZoom={13}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
					mapId={'1c910bd63b002525'} //todo .env
					onClick={handleMapClick}
					clickableIcons={false}
				>
					{kiosks.length > 0 &&
						kiosks.map((kiosk) => {
							return <KioskMarker key={kiosk._id} kiosk={kiosk} />;
						})}
				</Map>
			</aside>
		</APIProvider>
	);
}

interface KioskMarkerProps {
	kiosk: Kiosk;
}

function KioskMarker({ kiosk }: KioskMarkerProps) {
	const map = useMap();

	const [focusedKioskId, setFocusedKioskIdState] = useRecoilState(focusedKioskIdState);

	useEffect(() => {
		if (focusedKioskId === kiosk._id) {
			map?.panTo(kiosk.location);
		}
	}, [focusedKioskId]);

	const handleMarkerClick = (kioskId: string) => {
		console.log(map);
		map?.panTo(kiosk.location);
		setFocusedKioskIdState(kioskId);
	};

	// const [infowindowOpen, setInfowindowOpen] = useState(false);
	// const [markerRef, marker] = useAdvancedMarkerRef();

	const position = { lat: kiosk.location.lat, lng: kiosk.location.lng };
	return (
		<AdvancedMarker
			zIndex={focusedKioskId === kiosk._id ? 1 : 0}
			position={position}
			key={kiosk._id}
			onClick={() => {
				handleMarkerClick(kiosk._id);
				// setInfowindowOpen(true);
			}}
			// ref={markerRef}
		>
			<KioskMapIcon id={kiosk._id} />
		</AdvancedMarker>
	);
}

// infowindowOpen && (
// 	<InfoWindow onCloseClick={() => setInfowindowOpen(false)} anchor={marker}>
// 		<KioskCard kiosk={kiosk} index={1} />
// 		{/* Hello World */}
// 	</InfoWindow>

interface IndividualKioskMapProps {
	kiosk: Kiosk;
}
export function IndividualKioskMap({ kiosk }: IndividualKioskMapProps) {
	const position = { lat: kiosk.location.lat, lng: kiosk.location.lng };

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<div className={styles.individualKioskMap}>
				<Map center={position} defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true} mapId={'1c910bd63b002525'}>
					<AdvancedMarker position={position} key={kiosk._id}>
						<KioskMapIcon id={kiosk._id} />
					</AdvancedMarker>
				</Map>
			</div>
		</APIProvider>
	);
}
