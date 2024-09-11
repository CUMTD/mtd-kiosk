'use client';

import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { useMemo } from 'react';
import throwError from '../../helpers/throwError';
import useMapId from '../../hooks/useMapId';
import { Kiosk } from '../../sanity.types';
import { HealthStatus } from '../../types/HealthStatus';
import styles from './kioskMap.module.css';
import mapStyle from './kioskMap.styles';
import KioskMapIcon from './kioskMapIcon';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

interface IndividualKioskMapProps {
	kiosk: Kiosk;
	health: HealthStatus;
}

export default function IndividualKioskMap({ kiosk, health }: IndividualKioskMapProps) {
	const { _id, location } = kiosk;
	const locationCoords = useMemo(() => ({ lat: location?.lat ?? 0, lng: location?.lng ?? 0 }), [location]);
	const mapId = useMapId();

	return (
		<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
			<div className={styles.individualKioskMap}>
				<Map
					defaultCenter={locationCoords}
					defaultZoom={15}
					gestureHandling={'greedy'}
					mapId={mapId}
					zoomControl={false}
					disableDefaultUI={true}
					styles={mapStyle}
					maxZoom={15}
				>
					<AdvancedMarker position={locationCoords} key={_id}>
						<KioskMapIcon id={_id} health={health} openIssuesCount={0} />
					</AdvancedMarker>
				</Map>
			</div>
		</APIProvider>
	);
}
