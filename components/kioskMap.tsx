'use client';
import { APIProvider, AdvancedMarker, Map, MapMouseEvent, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import throwError from '../helpers/throwError';
import { Kiosk } from '../sanity.types';
import { client } from '../sanity/lib/client';
import { focusedKioskIdState } from '../state/mapState';
import { HealthStatus } from '../types/HealthStatus';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import styles from './kioskMap.module.css';
import KioskMapIcon from './kioskMapIcon';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

interface KioskMapProps {
	healthStatuses: ServerHealthStatuses[] | null;
}

export default function KioskMap({ healthStatuses }: KioskMapProps) {
	const setFocusedKioskIdState = useSetRecoilState(focusedKioskIdState);
	const [kiosks, setKiosks] = useState<Kiosk[]>([]);

	useEffect(() => {
		async function fetchKiosks() {
			const kiosks: Kiosk[] = await client.fetch("*[_type == 'kiosk'] {location, _id}");
			setKiosks(kiosks);
		}
		fetchKiosks();
	}, []);

	const defaultCenter = { lat: 40.11464841024296, lng: -88.22875539000833 };

	const handleMapClick = useCallback(
		(event: MapMouseEvent) => {
			if (!event.detail.placeId) {
				setFocusedKioskIdState(null);
			}
		},
		[setFocusedKioskIdState]
	);

	const [mapId, setMapId] = useState('1c910bd63b002525'); //todo .env

	useEffect(() => {
		window && setMapId(getMapColorPreference(window));
	}, []);

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<aside className={styles.mapContainer}>
				<Map
					defaultCenter={defaultCenter}
					defaultZoom={13}
					gestureHandling={'greedy'}
					disableDefaultUI={true}
					mapId={mapId} //todo .env
					onClick={handleMapClick}
					clickableIcons={false}
					styles={[
						{
							elementType: 'geometry',
							stylers: [
								{
									color: '#212121'
								}
							]
						},
						{
							elementType: 'labels.icon',
							stylers: [
								{
									visibility: 'off'
								}
							]
						},
						{
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#757575'
								}
							]
						},
						{
							elementType: 'labels.text.stroke',
							stylers: [
								{
									color: '#212121'
								}
							]
						},
						{
							featureType: 'administrative',
							elementType: 'geometry',
							stylers: [
								{
									color: '#757575'
								}
							]
						},
						{
							featureType: 'administrative.country',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#9e9e9e'
								}
							]
						},
						{
							featureType: 'administrative.land_parcel',
							stylers: [
								{
									visibility: 'off'
								}
							]
						},
						{
							featureType: 'administrative.locality',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#bdbdbd'
								}
							]
						},
						{
							featureType: 'poi',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#757575'
								}
							]
						},
						{
							featureType: 'poi.park',
							elementType: 'geometry',
							stylers: [
								{
									color: '#181818'
								}
							]
						},
						{
							featureType: 'poi.park',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#616161'
								}
							]
						},
						{
							featureType: 'poi.park',
							elementType: 'labels.text.stroke',
							stylers: [
								{
									color: '#1b1b1b'
								}
							]
						},
						{
							featureType: 'road',
							elementType: 'geometry.fill',
							stylers: [
								{
									color: '#2c2c2c'
								}
							]
						},
						{
							featureType: 'road',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#8a8a8a'
								}
							]
						},
						{
							featureType: 'road.arterial',
							elementType: 'geometry',
							stylers: [
								{
									color: '#373737'
								}
							]
						},
						{
							featureType: 'road.highway',
							elementType: 'geometry',
							stylers: [
								{
									color: '#3c3c3c'
								}
							]
						},
						{
							featureType: 'road.highway.controlled_access',
							elementType: 'geometry',
							stylers: [
								{
									color: '#4e4e4e'
								}
							]
						},
						{
							featureType: 'road.local',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#616161'
								}
							]
						},
						{
							featureType: 'transit',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#757575'
								}
							]
						},
						{
							featureType: 'water',
							elementType: 'geometry',
							stylers: [
								{
									color: '#000000'
								}
							]
						},
						{
							featureType: 'water',
							elementType: 'labels.text.fill',
							stylers: [
								{
									color: '#3d3d3d'
								}
							]
						}
					]}
				>
					{kiosks.length > 0 &&
						kiosks.map((kiosk) => {
							var health: HealthStatus | undefined = HealthStatus.UNKNOWN;
							var issues = 0;
							if (healthStatuses && healthStatuses.length > 0) {
								issues = healthStatuses.find((health) => health.kioskId === kiosk._id)?.openTicketCount || 0;
								health = healthStatuses.find((health) => health.kioskId === kiosk._id)?.overallHealth;
								if (health == undefined) health = HealthStatus.UNKNOWN;
							}
							return <KioskMarker key={kiosk._id} kiosk={kiosk} health={health} openIssueCount={issues} />;
						})}
				</Map>
			</aside>
		</APIProvider>
	);
}

interface KioskMarkerProps {
	kiosk: Kiosk;
	health: HealthStatus;
	openIssueCount: number;
}

function KioskMarker({ kiosk: { _id: kioskId, location }, health, openIssueCount }: KioskMarkerProps) {
	const map = useMap();
	const [focusedKioskId, setFocusedKioskIdState] = useRecoilState(focusedKioskIdState);

	const locationCoords = useMemo(() => ({ lat: location?.lat ?? 0, lng: location?.lng ?? 0 }), [location]);
	useEffect(() => {
		if (focusedKioskId === kioskId) {
			map?.panTo(locationCoords);
		}
	}, [focusedKioskId, kioskId, location, locationCoords, map]);

	const handleMarkerClick = (kioskId: string) => {
		map?.panTo(locationCoords);
		setFocusedKioskIdState(kioskId);
	};

	// const [infowindowOpen, setInfowindowOpen] = useState(false);
	// const [markerRef, marker] = useAdvancedMarkerRef();

	return (
		<AdvancedMarker
			zIndex={focusedKioskId === kioskId ? 1 : 0}
			position={locationCoords}
			key={kioskId}
			onClick={() => {
				handleMarkerClick(kioskId);
				// setInfowindowOpen(true);
			}}
			// ref={markerRef}
		>
			<KioskMapIcon health={health} id={kioskId} openIssuesCount={openIssueCount} />
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
export function IndividualKioskMap({ kiosk: { _id, location }, health }: IndividualKioskMapProps) {
	const locationCoords = useMemo(() => ({ lat: location?.lat ?? 0, lng: location?.lng ?? 0 }), [location]);
	const [mapId, setMapId] = useState('1c910bd63b002525'); //todo .env

	useEffect(() => {
		window && setMapId(getMapColorPreference(window));
	}, []);

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<div className={styles.individualKioskMap}>
				<Map
					defaultCenter={locationCoords}
					defaultZoom={15}
					gestureHandling={'greedy'}
					mapId={mapId} //todo .env
					zoomControl={false}
					disableDefaultUI={true}
				>
					<AdvancedMarker position={locationCoords} key={_id}>
						<KioskMapIcon id={_id} health={health} openIssuesCount={0} />
					</AdvancedMarker>
				</Map>
			</div>
		</APIProvider>
	);
}

function getMapColorPreference(window: Window) {
	// get light or dark mode preference from browser
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	var mapId = prefersDarkScheme.matches ? '1c910bd63b002525' : '82cc627fc8ea004a'; //todo .env
	return mapId;
}
