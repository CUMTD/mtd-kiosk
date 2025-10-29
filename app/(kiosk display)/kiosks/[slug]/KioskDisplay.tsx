'use client';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { darkModeState, kioskState } from '../../../../state/kioskState';
import KioskAdsCarousel from './KioskAdsCarousel';
import KioskDataUpdater from './KioskDataUpdater';
import KioskDepartureList from './KioskDepartureList';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import VeoRideMap from './VeoRideMap';

export function KioskDisplay() {
	const { isHorizontal } = useRecoilValue(kioskState);

	const darkMode = useRecoilValue(darkModeState);
	const classes = clsx({
		[styles.kioskDisplay]: true,
		[styles.horizontal]: isHorizontal,
		[styles.darkMode]: darkMode,
		[styles.lightMode]: !darkMode
	});

	return (
		<>
			<KioskDataUpdater />
			<div className={classes}>
				<KioskHeader />
				<KioskDepartureList />
				<VeoRideMap />

				{!isHorizontal && <KioskAdsCarousel />}
			</div>
		</>
	);
}
