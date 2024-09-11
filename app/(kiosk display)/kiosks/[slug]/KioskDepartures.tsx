'use client';
import { useRecoilValue } from 'recoil';
import { kioskState } from '../../../../state/kioskState';
import DepartureUpdater from './DepartureUpdater';
import GeneralMessageUpdater from './GeneralMessageUpdater';
import IconMessageUpdater from './IconMessageUpdater';
import KioskDepartureItemList from './KioskDepartureItemList';

export default function KioskDepartures() {
	const { stopId } = useRecoilValue(kioskState);

	if (!stopId || stopId.length === 0) {
		console.warn('No stop ID provided');
		return;
	}

	return (
		<>
			<DepartureUpdater />
			<GeneralMessageUpdater />
			<IconMessageUpdater />
			<KioskDepartureItemList />
		</>
	);
}
