'use client';

import { APIProvider, ColorScheme, Map, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import throwError from '../../../../helpers/throwError';
import { currentlyFilteredKiosksSelector, focusedKioskIdState } from '../../../../state/sidebarState';
import styles from './kioskMap.module.css';
import KioskMapMarker from './kioskMapMarker';
import MapBoundsUpdater from './mapBoundsUpdater';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID');

export default function KioskMap() {
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
					mapId={GOOGLE_MAPS_MAP_ID}
					onClick={handleMapClick}
					clickableIcons={false}
					defaultCenter={defaultCenter}
					defaultZoom={17}
					colorScheme={ColorScheme.FOLLOW_SYSTEM}
				>
					{kiosks.length > 0 && kiosks.map(({ _id: id }) => <KioskMapMarker key={id} kioskId={id} />)}
					<MapBoundsUpdater kiosks={kiosks} />
				</Map>
			</aside>
		</APIProvider>
	);
}
