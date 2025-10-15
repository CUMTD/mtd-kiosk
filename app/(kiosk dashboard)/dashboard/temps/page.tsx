import { Metadata } from 'next';
import KioskTemperaturesList from './KioskTemperaturesList';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'Temperature Overview'
};

export default function TempsPage() {
	return (
		<main className={styles.page}>
			<div className={styles.temperatureDashboard}>
				<KioskTemperaturesList />
			</div>
		</main>
	);
}
