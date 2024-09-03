'use client';
import { useSetRecoilState } from 'recoil';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity.types';
import { advertisementsState } from '../../../../state/kioskState';
import { useEffect } from 'react';
import throwError from '../../../../helpers/throwError';

const AD_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_AD_FETCH_INTERVAL ?? '');

if (!AD_FETCH_INTERVAL || isNaN(AD_FETCH_INTERVAL)) {
	throwError('NEXT_PUBLIC_AD_FETCH_INTERVAL is not defined');
}

interface KioskAdsUpdaterProps {
	kiosk: Kiosk;
}
export default function KioskAdsUpdater({ kiosk }: KioskAdsUpdaterProps) {
	const setAds = useSetRecoilState(advertisementsState);

	useEffect(() => {
		async function updateKioskAds() {
			const ads = await fetchKioskAdsByKioskId(kiosk._id);

			setAds(ads);
		}
		updateKioskAds();
		const timer = setInterval(updateKioskAds, AD_FETCH_INTERVAL);
		return () => clearInterval(timer);
	}, [kiosk, setAds]);

	return null;
}
