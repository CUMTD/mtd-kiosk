'use client';
import { useRecoilValue } from 'recoil';
import { kioskState } from '../../../../state/kioskState';
import DarkModeUpdater from './DarkModeUpdater';
import DepartureUpdater from './DepartureUpdater';
import GeneralMessageUpdater from './GeneralMessageUpdater';
import IconMessageUpdater from './IconMessageUpdater';
import KioskAdsUpdater from './KioskAdsUpdater';
import RealtimePositionUpdater from './realtimePositionUpdater';
import RoutePolylinesUpdater from './RoutePolylinesUpdater';

export default function KioskDataUpdater() {
	const { stopId } = useRecoilValue(kioskState);

	if (!stopId || stopId.length === 0) {
		console.warn('No stop ID provided');
		return;
	}

	return (
		<>
			<DarkModeUpdater />
			<DepartureUpdater />
			<GeneralMessageUpdater />
			<IconMessageUpdater />
			<KioskAdsUpdater />
			<RealtimePositionUpdater />
			<RoutePolylinesUpdater />
		</>
	);
}
