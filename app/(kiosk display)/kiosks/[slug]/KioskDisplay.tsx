'use client';

import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { darkModeState, kioskState } from '../../../../state/kioskState';
import KioskAdsCarousel from './KioskAdsCarousel';
import KioskDataUpdater from './KioskDataUpdater';
import KioskDepartureList from './KioskDepartureList';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';

export function KioskDisplay() {
	const { isHorizontal } = useAtomValue(kioskState);

	const darkMode = useAtomValue(darkModeState);
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

				{!isHorizontal && <KioskAdsCarousel />}
			</div>
		</>
	);
}
