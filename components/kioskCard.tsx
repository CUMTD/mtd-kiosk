import { Inter } from 'next/font/google';
import { SanityValues } from '../sanity.config';
import IStopIcon from './iStopIcon';
import styles from './kioskCard.module.css';
import KioskStatusBadge from './kioskStatusBadge';

interface KioskCardProps {
	kiosk: SanityValues['kiosk'];
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kiosk: { slug, _id, displayName, iStop } }: KioskCardProps) {
	return (
		<div className={styles.kioskCard}>
			<code className={styles.kioskId}>{_id}</code>
			<div className={styles.badges}>
				<KioskStatusBadge up text={'LCD'} />
				<KioskStatusBadge up text={'LED'} />
				<KioskStatusBadge up text={'Button'} />
			</div>
			<div className={styles.kioskName}>
				<h2>{displayName}</h2>
				{iStop && <IStopIcon />}
			</div>

			<div className={styles.buttonContainer}>
				<a href={`https://kiosk.mtd.org/kiosks/${slug}/`} target="_blank" className={`${inter.className} ${styles.button}`}>
					View
				</a>
				<a className={styles.button}>Manage Ads</a>
			</div>
		</div>
	);
}
