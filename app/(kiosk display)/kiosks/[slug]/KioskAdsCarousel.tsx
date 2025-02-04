'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { advertisementsState } from '../../../../state/kioskState';
import styles from './KioskAdsCarousel.module.css';
import throwError from '../../../../helpers/throwError';
import BusRealtimeMap from './KioskAdMap';

const AD_ROTATION_INTERVAL = parseInt(process.env.NEXT_PUBLIC_AD_ROTATION_INTERVAL ?? '');

if (!AD_ROTATION_INTERVAL || isNaN(AD_ROTATION_INTERVAL)) {
	throwError('NEXT_PUBLIC_AD_ROTATION_INTERVAL is not defined');
}

export default function KioskAdsCarousel() {
	const advertisements = useRecoilValue(advertisementsState);

	const [currentAd, setCurrentAd] = useState(0);

	const ad = advertisements[currentAd];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentAd((prevAd) => (prevAd + 1) % advertisements.length);
		}, AD_ROTATION_INTERVAL);

		return () => clearInterval(interval);
	}, [advertisements]);
	// return (
	// 	<footer className={styles.footer}>{ad && <span>{ad.imageUrl && <Image src={ad.imageUrl} alt={ad.name || ''} width={1080} height={480} />}</span>}</footer>
	// );

	return (
		<footer className={styles.footer}>
			<BusRealtimeMap />;
		</footer>
	);
}
