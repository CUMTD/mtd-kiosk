'use client';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { darkModeState, kioskState } from '../../../../state/kioskState';
import DarkModeUpdater from './DarkModeUpdater';
import KioskAds from './KioskAds';
import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';

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
		<div className={classes}>
			<DarkModeUpdater />
			<KioskHeader />
			<KioskDepartures />
			<KioskAds />
		</div>
	);
}
