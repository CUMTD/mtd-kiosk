'use client';

import { AdvancedMarker, APIProvider, ColorScheme, Map } from '@vis.gl/react-google-maps';
import { useMemo } from 'react';
import throwError from '../../helpers/throwError';
import { Kiosk } from '../../sanity.types';
import { HealthStatus } from '../../types/HealthStatus';
import KioskMapIcon from './kioskMapIcon';
import { RecoilRoot } from 'recoil';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID');

interface IndividualKioskMapProps {
	kiosk: Kiosk;
	health: HealthStatus;
}

export default function IndividualKioskMap({ kiosk, health }: IndividualKioskMapProps) {
	const { _id, location } = kiosk;
	const locationCoords = useMemo(() => ({ lat: location?.lat ?? 0, lng: location?.lng ?? 0 }), [location]);

	return (
		<RecoilRoot>
			<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
				<Map
					defaultCenter={locationCoords}
					defaultZoom={15}
					gestureHandling={'greedy'}
					colorScheme={ColorScheme.FOLLOW_SYSTEM}
					zoomControl={false}
					disableDefaultUI={true}
					maxZoom={15}
					mapId={GOOGLE_MAPS_MAP_ID}
				>
					<AdvancedMarker position={locationCoords} key={_id}>
						<KioskMapIcon id={_id} health={health} openIssuesCount={0} />
					</AdvancedMarker>
				</Map>
			</APIProvider>
		</RecoilRoot>
	);
}
