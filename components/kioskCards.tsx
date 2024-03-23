import { client } from '@/sanity/lib/client';
import Kiosk from '@/sanity/schemas/types/kiosk';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';

export default async function KioskCards() {
	const query = `*[_type == 'kiosk']`;
	const kiosks = (await client.fetch(query)) as Kiosk[];

	return (
		<div className={styles.kioskCardsContainer}>
			{kiosks.map((kiosk) => (
				<KioskCard key={kiosk._id} kiosk={kiosk} />
			))}
		</div>
	);
}
