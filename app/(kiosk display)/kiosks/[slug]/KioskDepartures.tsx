'use client';
import { Kiosk } from '../../../../sanity.types';
import KioskDepartureItemList from './KioskDepartureItemList';
import DepartureUpdater from './DepartureUpdater';
import throwError from '../../../../helpers/throwError';
import GeneralMessageUpdater from './GeneralMessageUpdater';
import IconMessageUpdater from './IconMessageUpdater';

interface KioskDeparturesProps {
	kiosk: Kiosk;
}

export default function KioskDepartures({ kiosk }: KioskDeparturesProps) {
	if (!kiosk.stopId) {
		throwError("Kiosk is null or doesn't have a stop ID");
	}
	return (
		<>
			<DepartureUpdater primaryStopId={kiosk.stopId} additionalStopIds={kiosk.additionalStopIds || []} kioskId={kiosk._id} />
			<GeneralMessageUpdater stopId={kiosk.stopId} />
			<IconMessageUpdater kioskId={kiosk._id} />
			<KioskDepartureItemList />
		</>
	);
}
