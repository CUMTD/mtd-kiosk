import Kiosk from '@/sanity/schemas/types/kiosk';
import styles from './kioskCard.module.css';
import KioskStatusBadge from './kioskStatusBadge';
import { Inter } from 'next/font/google';
import IStopIcon from './iStopIcon';
import clsx from 'clsx';

interface KioskCardProps {
	kiosk: Kiosk;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kiosk }: KioskCardProps) {
	const classes = clsx({
		[styles.button]: true,
		[inter.className]: true
	});

	return (
		<div className={styles.kioskCard}>
			<code className={styles.kioskId}>{kiosk._id}</code>
			<div className={styles.badges}>
				<KioskStatusBadge up text={'LCD'} />
				<KioskStatusBadge up text={'LED'} />
				<KioskStatusBadge up text={'Button'} />
			</div>
			<div className={styles.kioskName}>
				<h2>{kiosk.displayName}</h2>
				{kiosk.iStop && <IStopIcon />}
			</div>

			<div className={styles.buttonContainer}>
				<a href={`https://kiosk.mtd.org/kiosks/${kiosk.slug}/`} target="_blank" className={`${inter.className} ${styles.button}`}>
					View
				</a>
				<a className={styles.button}>Manage Ads</a>
			</div>
		</div>
	);
}
