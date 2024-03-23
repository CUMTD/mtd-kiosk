import KioskCards from '../components/kioskCards';
import Toolbar from '../components/toolbar';
import styles from './page.module.css';

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
