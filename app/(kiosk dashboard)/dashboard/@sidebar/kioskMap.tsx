'use client';

import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import mapStyle from '../../../../components/map/kioskMap.styles';
import throwError from '../../../../helpers/throwError';
import useMapId from '../../../../hooks/useMapId';
import { currentlyFilteredKiosksSelector, focusedKioskIdState } from '../../../../state/sidebarState';
import styles from './kioskMap.module.css';
import KioskMapMarker from './kioskMapMarker';
import MapBoundsUpdater from './mapBoundsUpdater';
import RouteOverlays from '../../../(kiosk display)/kiosks/[slug]/RouteOverlays';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

export default function KioskMap() {
	const mapId = useMapId();

	const setFocusedKioskIdState = useSetRecoilState(focusedKioskIdState);
	const kiosks = useRecoilValue(currentlyFilteredKiosksSelector);
	const defaultCenter = { lat: 40.11464841024296, lng: -88.22875539000833 };

	const handleMapClick = useCallback(
		(event: MapMouseEvent) => {
			if (!event.detail.placeId) {
				setFocusedKioskIdState(null);
			}
		},
		[setFocusedKioskIdState]
	);

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<aside className={styles.mapContainer}>
				<Map
					gestureHandling={'greedy'}
					disableDefaultUI={true}
					mapId={mapId}
					onClick={handleMapClick}
					clickableIcons={false}
					styles={mapStyle}
					defaultCenter={defaultCenter}
					defaultZoom={17}
				>
					<RouteOverlays />
					{kiosks.length > 0 && kiosks.map(({ _id: id }) => <KioskMapMarker key={id} kioskId={id} />)}
					<MapBoundsUpdater kiosks={kiosks} />
				</Map>
			</aside>
		</APIProvider>
	);
}
