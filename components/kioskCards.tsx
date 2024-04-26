'use client';
import { useSetRecoilState } from 'recoil';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';
import { focusedKioskIdState } from '../state/mapState';

interface KioskCardsProps {
	kiosks: Kiosk[];
	readonly?: boolean;
}
export default function KioskCards({ kiosks, readonly }: KioskCardsProps) {
	const setFocusedKioskId = useSetRecoilState(focusedKioskIdState);

	return (
		<main className={styles.kioskCardsContainer}>
			{kiosks
				.sort((a, b) => a.displayName.localeCompare(b.displayName))
				.map((kiosk, idx) => (
					<KioskCard key={kiosk._id} kiosk={kiosk} index={idx} clickable={!readonly} />
				))}
		</main>
	);
}
