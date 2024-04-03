import { APIProvider, AdvancedMarker, InfoWindow, Map, MapCameraChangedEvent, MapMouseEvent, Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
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

	const handleMapClick = useCallback((event: MapMouseEvent) => {
		if (!event.detail.placeId) {
			setFocusedKioskIdState(null);
		}
	}, []);

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			{showMap && (
				<div style={{ flex: 3 }} className={styles.mapContainer}>
					<Map
						defaultCenter={def_position}
						defaultZoom={13}
						gestureHandling={'greedy'}
						disableDefaultUI={true}
						mapId={'1c910bd63b002525'}
						onClick={handleMapClick}
						clickableIcons={false}

						// center={kiosks.find((kiosk) => kiosk._id === focusedKioskId)?.location ?? def_position}
					>
						{kiosks.length > 0 &&
							kiosks.map((kiosk) => {
								return <KioskMarker key={kiosk._id} kiosk={kiosk} />;
							})}
						{/* <Marker position={position} /> */}
					</Map>
				</div>
			)}
		</APIProvider>
	);
}

interface KioskMarkerProps {
	kiosk: Kiosk;
}

function KioskMarker({ kiosk }: KioskMarkerProps) {
	const [focusedKioskId, setFocusedKioskIdState] = useRecoilState(focusedKioskIdState);

	const handleMarkerClick = (kioskId: string) => {
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
			{/* todo wire up to actul health */}
			<KioskMapIcon status={HealthStatus.HEALTHY} id={kiosk._id} />
		</AdvancedMarker>
	);
}

// infowindowOpen && (
// 	<InfoWindow onCloseClick={() => setInfowindowOpen(false)} anchor={marker}>
// 		<KioskCard kiosk={kiosk} index={1} />
// 		{/* Hello World */}
// 	</InfoWindow>
