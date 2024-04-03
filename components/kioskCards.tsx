import { Kiosk } from '../sanity/schemas/documents/kiosk';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';
import { useEffect, useState } from 'react';
import fetchKioskList from '../helpers/fetchKioskList';

export default function KioskCards() {
	const [kiosks, setKiosks] = useState<Kiosk[]>([]);

	useEffect(() => {
		const fetchKiosks = async () => {
			const kiosks = await fetchKioskList();
			setKiosks(kiosks);
		};
		fetchKiosks();
	}, []);

	return (
		<div className={styles.kioskCardsContainer}>
			{kiosks
				.sort((a, b) => a.displayName.localeCompare(b.displayName))
				.map((kiosk, idx) => (
					<KioskCard key={kiosk._id} kiosk={kiosk} index={idx} />
				))}
		</div>
	);
}
