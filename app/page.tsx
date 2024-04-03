'use client';
import KioskCards from '../components/kioskCards';
import KioskMap from '../components/kioskMap';
import styles from './page.module.css';

export default function Home() {
	return (
		<div style={{ height: '100vh', overflow: 'clip' }}>
			<main className={styles.main}>
				<KioskMap />
				<KioskCards />
			</main>
		</div>
	);
}
