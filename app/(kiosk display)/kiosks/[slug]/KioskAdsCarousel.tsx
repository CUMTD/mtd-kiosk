'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { advertisementsState } from '../../../../state/kioskState';
import styles from './KioskAdsCarousel.module.css';

export default function KioskAdsCarousel() {
	const advertisements = useRecoilValue(advertisementsState);

	const [currentAd, setCurrentAd] = useState(0);

	const ad = advertisements[currentAd];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentAd((prevAd) => (prevAd + 1) % advertisements.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [advertisements]);
	return (
		<footer className={styles.footer}>{ad && <span>{ad.imageUrl && <Image src={ad.imageUrl} alt={ad.name || ''} width={1080} height={480} />}</span>}</footer>
	);
}
