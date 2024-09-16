'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';
import { Kiosk } from '../../../sanity.types';
import { useRecoilValue } from 'recoil';
import { focusedKioskIdState } from '../../../state/sidebarState';

interface Props {
	kiosks: Kiosk[];
}

export default function MapBoundsUpdater({ kiosks }: Props) {
	const map = useMap();
	const focusedKioskId = useRecoilValue(focusedKioskIdState);

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
		}
	}, [bounds, map]);

	useEffect(() => {
		if (focusedKioskId) {
			const focusedKiosk = kiosks.find((k) => k._id === focusedKioskId);
			if (focusedKiosk?.location && focusedKiosk.location.lat && focusedKiosk.location.lng) {
				const location = { lat: focusedKiosk.location.lat, lng: focusedKiosk.location.lng };
				map?.panTo(location);
			}
		}
	}, [focusedKioskId, kiosks, map]);

	return null;
}
