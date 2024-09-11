'use client';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchKioskAdsByKioskId } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { advertisementsState, kioskState } from '../../../../state/kioskState';

const AD_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_AD_FETCH_INTERVAL ?? '');

if (!AD_FETCH_INTERVAL || isNaN(AD_FETCH_INTERVAL)) {
	throwError('NEXT_PUBLIC_AD_FETCH_INTERVAL is not defined');
}

export default function KioskAdsUpdater() {
	const setAds = useSetRecoilState(advertisementsState);
	const { _id: id } = useRecoilValue(kioskState);
	useEffect(() => {
		async function updateKioskAds() {
			const ads = await fetchKioskAdsByKioskId(id);

			setAds(ads);
		}
		updateKioskAds();
		const timer = setInterval(updateKioskAds, AD_FETCH_INTERVAL);
		return () => clearInterval(timer);
	}, [id, setAds]);

	return null;
}
