import Link from 'next/link';
import './(kiosk dashboard)/dashboard/globals.css';
import SanityStudioIcon from '../components/sanityStudioIcon';
import styles from './page.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function WelcomePage() {
	return (
		<div className={`${styles.container} ${inter.className}`}>
			<div className={styles.icon}>
				<SanityStudioIcon />
			</div>
			<h1>Kiosk Dashboard</h1>
			<Link className={styles.loginButton} href="/dashboard">
				Login
			</Link>
		</div>
	);
}
