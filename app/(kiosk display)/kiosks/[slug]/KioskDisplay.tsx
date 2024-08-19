import { useRouter } from 'next/navigation';
import Departure from '../../../../types/kioskDisplayTypes/Departure';
import KioskAds from './KioskAds';
import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import { Advertisement, Kiosk } from '../../../../sanity.types';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';
import { useEffect, useState } from 'react';

// 7 departures
const sampleDepartures: Departure[] = [
	{
		routeNumber: '2',
		headsign: 'Red',
		direction: 'Champaign',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#ed1c24',
		departureTimes: ['DUE', '10 min', '20 min'],
		isRealTime: true
	},
	{
		routeNumber: '12',
		headsign: 'Teal',
		direction: 'West',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#006991',
		departureTimes: ['1 min', '9 min', '17 min'],
		isRealTime: true
	},
	{
		routeNumber: '5',
		headsign: 'Green Hopper',
		direction: 'West',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#008063',
		departureTimes: ['3 min', '9 min', '15 min'],
		isRealTime: true
	},
	{
		routeNumber: '22',
		headsign: 'Illini',
		direction: 'South',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#5a1d5a',
		departureTimes: ['6 min', '21 min', '30 min'],
		isRealTime: true
	},
	{
		routeNumber: '1',
		headsign: 'Yellow',
		direction: 'South',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#f9e300',
		departureTimes: ['11 min', '21 min', '8:15 PM'],
		isRealTime: true
	},
	{
		routeNumber: '130',
		headsign: 'Silver',
		direction: 'North',
		foregroundHexColor: '#000000',
		backgroundHexColor: '#a5acaf',
		departureTimes: ['15 min', '17 min', '8:22 PM'],
		isRealTime: true
	},
	{
		routeNumber: '24',
		headsign: 'Link',
		direction: 'North',
		foregroundHexColor: '#FFFFFF',
		backgroundHexColor: '#00a1de',
		departureTimes: ['8:20 PM', '8:33 PM', '8:45 PM'],
		isRealTime: true
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
