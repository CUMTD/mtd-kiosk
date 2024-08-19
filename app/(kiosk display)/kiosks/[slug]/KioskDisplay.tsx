import { useRouter } from 'next/navigation';
import Departure from '../../../../types/kioskDisplayTypes/Departure';
import KioskAds from './KioskAds';
import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import { Advertisement, Kiosk } from '../../../../sanity.types';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';
import { useEffect, useState } from 'react';

const sampleDepartures: Departure[] = [
	{
		routeNumber: '2',
		headsign: 'Red',
		direction: 'Champaign',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#ed1c24',
		departureTimes: [
			{ time: 'DUE', isRealTime: true, isHopper: true },
			{ time: '10 min', isRealTime: true, isHopper: false },
			{ time: '20 min', isRealTime: true, isHopper: false }
		]
	},
	{
		routeNumber: '12',
		headsign: 'Teal',
		direction: 'West',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#006991',
		departureTimes: [
			{ time: '1 min', isRealTime: true, isHopper: false },
			{ time: '9 min', isRealTime: true, isHopper: false },
			{ time: '17 min', isRealTime: true, isHopper: false }
		]
	},
	{
		routeNumber: '5',
		headsign: 'Green',
		direction: 'West',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#008063',
		departureTimes: [
			{ time: '3 min', isRealTime: true, isHopper: false },
			{ time: '9 min', isRealTime: true, isHopper: true },
			{ time: '15 min', isRealTime: true, isHopper: false }
		]
	},
	{
		routeNumber: '22',
		headsign: 'Illini',
		direction: 'South',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#5a1d5a',
		departureTimes: [
			{ time: '6 min', isRealTime: true, isHopper: true },
			{ time: '21 min', isRealTime: true, isHopper: false },
			{ time: '30 min', isRealTime: true, isHopper: true }
		]
	},
	{
		routeNumber: '1',
		headsign: 'Yellow',
		direction: 'South',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#f9e300',
		departureTimes: [
			{ time: '11 min', isRealTime: true, isHopper: false },
			{ time: '21 min', isRealTime: true, isHopper: true },
			{ time: '8:15 PM', isRealTime: false, isHopper: false }
		]
	},
	{
		routeNumber: '130',
		headsign: 'Silver',
		direction: 'North',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#a5acaf',
		departureTimes: [
			{ time: '15 min', isRealTime: true, isHopper: false },
			{ time: '17 min', isRealTime: true, isHopper: false },
			{ time: '8:22 PM', isRealTime: false, isHopper: true }
		]
	},
	{
		routeNumber: '24',
		headsign: 'Link',
		direction: 'North',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#00a1de',
		departureTimes: [
			{ time: '8:20 PM', isRealTime: false, isHopper: true },
			{ time: '8:33 PM', isRealTime: false, isHopper: true },
			{ time: '8:45 PM', isRealTime: false, isHopper: true }
		]
	}
];

interface KioskDisplayProps {
	kiosk: Kiosk;
}

export default async function KioskDisplay({ kiosk }: KioskDisplayProps) {
	const kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	return (
		<div className={styles.kioskDisplay}>
			<KioskHeader stopName={kiosk.displayName} iStop={kiosk.iStop} />
			<KioskDepartures departures={sampleDepartures} />
			<KioskAds advertisements={kioskAds} />
		</div>
	);
}
