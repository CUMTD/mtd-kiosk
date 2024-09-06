'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';
import { Kiosk } from '../../../sanity.types';

interface Props {
	kiosks: Kiosk[];
}

export default function MapBoundsUpdater({ kiosks }: Props) {
	const map = useMap();

	const bounds = useMemo(
		() =>
			kiosks.reduce((bounds, kiosk) => {
				if (kiosk.location && kiosk.location.lat && kiosk.location.lng) {
					const location = { lat: kiosk.location.lat, lng: kiosk.location.lng };
					bounds.push(location);
				}
				return bounds;
			}, new Array<{ lat: number; lng: number }>()),
		[kiosks]
	);

	useEffect(() => {
		if (map) {
			const googleBounds = new google.maps.LatLngBounds();
			bounds.forEach((bound) => {
				googleBounds.extend(bound);
			});
			map.fitBounds(googleBounds);
			console.log('fit bounds ran');
		} else {
			console.log('no map for fit bounds');
		}
	}, [bounds, map]);

	return null;
}
