import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo } from 'react';
import { Kiosk } from '../../sanity.types';
import { ServerHealthStatuses } from '../../types/serverHealthStatuses';
import KioskMapIcon from './kioskMapIcon';

interface KioskMarkerProps {
	kiosk: Kiosk;
	health: ServerHealthStatuses;
	focusedKioskId?: string;
	setFocusCallback: () => void;
}

export default function KioskMarker({
	kiosk: { _id: id, location },
	health: { overallHealth, openTicketCount },
	focusedKioskId,
	setFocusCallback
}: KioskMarkerProps) {
	const map = useMap();

	const locationCoords = useMemo(() => ({ lat: location?.lat ?? 0, lng: location?.lng ?? 0 }), [location]);

	useEffect(() => {
		if (focusedKioskId === id) {
			map?.panTo(locationCoords);
		}
	}, [focusedKioskId, id, location, locationCoords, map]);

	const handleMarkerClick = useCallback(() => {
		map?.panTo(locationCoords);
		setFocusCallback();
	}, [locationCoords, map, setFocusCallback]);

	const markerZIndex = focusedKioskId === id ? 1 : 0;

	return (
		<AdvancedMarker zIndex={markerZIndex} position={locationCoords} key={id} onClick={handleMarkerClick}>
			<KioskMapIcon health={overallHealth} id={id} openIssuesCount={openTicketCount ?? 0} />
		</AdvancedMarker>
	);
}
