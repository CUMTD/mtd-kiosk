'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Advertisement } from '../../../../sanity.types';
import styles from './KioskAds.module.css';

interface KioskAdsProps {
	advertisements: Advertisement[];
}

export default function KioskAds({ advertisements }: KioskAdsProps) {
	const [currentAd, setCurrentAd] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentAd((prevAd) => (prevAd + 1) % advertisements.length);
		}, 10000);

		return () => clearInterval(interval);
	}, [advertisements]);

	const ad = advertisements[currentAd];

	return (
		<footer className={styles.footer}>
			<span>{ad.imageUrl && <Image src={ad.imageUrl} alt={ad.name || ''} width={1080} height={480} />}</span>
		</footer>
	);
}
