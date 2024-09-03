'use client';
import KioskDepartures from './KioskDepartures';
import styles from './KioskDisplay.module.css';
import KioskHeader from './KioskHeader';
import { Kiosk } from '../../../../sanity.types';
import KioskAds from './KioskAds';
import clsx from 'clsx';
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';
import DarkModeUpdater from './DarkModeUpdater';

interface KioskDisplayProps {
	kiosk: Kiosk;
	horizontal?: boolean;
}

export function KioskDisplay({ kiosk, horizontal }: KioskDisplayProps) {
	const darkMode = useRecoilValue(darkModeState);
	const classes = clsx(styles.kioskDisplay, { [styles.horizontal]: horizontal, [styles.darkMode]: darkMode, [styles.lightMode]: !darkMode });

	return (
		<div className={classes}>
			<DarkModeUpdater />
			<KioskHeader stopName={kiosk?.displayName} iStop={kiosk?.iStop} />
			<KioskDepartures kiosk={kiosk} />
			{!kiosk.isHorizontal && <KioskAds kiosk={kiosk} />}
		</div>
	);
}
