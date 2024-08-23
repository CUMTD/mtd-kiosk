'use client';
import { useSetRecoilState } from 'recoil';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity.types';
import { advertisementsState } from '../../../../state/kioskState';
import { useEffect } from 'react';

interface KioskAdsUpdaterProps {
	kiosk: Kiosk;
}
export default function KioskAdsUpdater({ kiosk }: KioskAdsUpdaterProps) {
	const setAds = useSetRecoilState(advertisementsState);

	useEffect(() => {
		async function updateKioskAds() {
			console.log('Fetching ads');
			const ads = await fetchKioskAdsByKioskId(kiosk._id);

			setAds(ads);
		}
		updateKioskAds();
		const timer = setInterval(updateKioskAds, 3600000);
		return () => clearInterval(timer);
	}, [kiosk, setAds]);

	return null;
}
