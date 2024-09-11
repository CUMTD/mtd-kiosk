'use client';

import KioskAdsCarousel from './KioskAdsCarousel';
import KioskAdsUpdater from './KioskAdsUpdater';

export default function KioskAds() {
	return (
		<>
			<KioskAdsUpdater />
			<KioskAdsCarousel />
		</>
	);
}
