'use client';
import { RecoilRoot } from 'recoil';
import { Kiosk } from '../../../../sanity.types';
import KioskDepartureItemList from './KioskDepartureItemList';
import DepartureUpdater from './DepartureUpdater';
import throwError from '../../../../helpers/throwError';

interface KioskDeparturesProps {
	kiosk: Kiosk;
}

export default function KioskDepartures({ kiosk }: KioskDeparturesProps) {
	if (!kiosk.stopId) {
		throwError("Kiosk is null or doesn't have a stop ID");
	}
	return (
		<RecoilRoot>
			<DepartureUpdater stopId={kiosk.stopId} kioskId={kiosk._id} />
			<KioskDepartureItemList />
		</RecoilRoot>
	);
}
