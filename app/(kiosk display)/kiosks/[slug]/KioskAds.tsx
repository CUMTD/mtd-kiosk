'use client';

import { RecoilRoot } from 'recoil';
import KioskAdsUpdater from './KioskAdsUpdater';
import { Kiosk } from '../../../../sanity.types';
import KioskAdsCarousel from './KioskAdsCarousel';

interface KioskAdsProps {
	kiosk: Kiosk;
}

export default function KioskAds({ kiosk }: KioskAdsProps) {
	return (
		<RecoilRoot>
			<KioskAdsUpdater kiosk={kiosk} />
			<KioskAdsCarousel />
		</RecoilRoot>
	);
}
