import KioskCards from '@/components/kioskCards';
import styles from './page.module.css';
import Toolbar from '@/components/toolbar';

export default function Home() {
	return (
		<>
			<Toolbar />
			<main className={styles.main}>
				<KioskCards />
			</main>
		</>
	);
}
