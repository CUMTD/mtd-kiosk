'use client';

import KioskAdsUpdater from './KioskAdsUpdater';
import { Kiosk } from '../../../../sanity.types';
import KioskAdsCarousel from './KioskAdsCarousel';

interface KioskAdsProps {
	kiosk: Kiosk;
}

export default function KioskAds({ kiosk }: KioskAdsProps) {
	return (
		<>
			<KioskAdsUpdater kiosk={kiosk} />
			<KioskAdsCarousel />
		</>
	);
}
