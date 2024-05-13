/// <reference types="google.maps" />
'use client';
import { APIProvider, AdvancedMarker, Map, MapMouseEvent, useMap } from '@vis.gl/react-google-maps';
import { client } from '../sanity/lib/client';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { focusedKioskIdState, showMapState } from '../state/mapState';
import { useRouter } from 'next/navigation';
import styles from './kioskMap.module.css';
import throwError from '../helpers/throwError';
import KioskMapIcon from './kioskMapIcon';
import { HealthStatuses, ServerHealthStatuses } from '../types/serverHealthStatuses';
import { HealthStatus } from '../types/HealthStatus';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

interface KioskMapProps {
	healthStatuses: ServerHealthStatuses[] | null;
}

export default function KioskMap({ healthStatuses }: KioskMapProps) {
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
							const health = healthStatuses?.find((health) => health.kioskId === kiosk._id)?.overallHealth;
							return <KioskMarker key={kiosk._id} kiosk={kiosk} health={health || HealthStatus.UNKNOWN} />;
						})}
				</Map>
			</aside>
		</APIProvider>
	);
}

interface KioskMarkerProps {
	kiosk: Kiosk;
	health: HealthStatus;
}

function KioskMarker({ kiosk, health }: KioskMarkerProps) {
	const map = useMap();

	const [focusedKioskId, setFocusedKioskIdState] = useRecoilState(focusedKioskIdState);

	useEffect(() => {
		if (focusedKioskId === kiosk._id) {
			map?.panTo(kiosk.location);
		}
	}, [focusedKioskId]);

	const handleMarkerClick = (kioskId: string) => {
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
			<KioskMapIcon health={health} id={kiosk._id} />
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
	health: HealthStatus;
}
export function IndividualKioskMap({ kiosk, health }: IndividualKioskMapProps) {
	const position = { lat: kiosk.location.lat, lng: kiosk.location.lng };

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<div className={styles.individualKioskMap}>
				<Map center={position} defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true} mapId={'1c910bd63b002525'}>
					<AdvancedMarker position={position} key={kiosk._id}>
						<KioskMapIcon id={kiosk._id} health={health} />
					</AdvancedMarker>
				</Map>
			</div>
		</APIProvider>
	);
}
