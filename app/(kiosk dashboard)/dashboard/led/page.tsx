import { Metadata } from 'next';
import LedPreviewList from './ledPreviewList';
import styles from './page.module.css';

export const metadata: Metadata = {
	title: 'LED Superview'
};

export default function LedDashboard() {
	return (
		<main className={styles.page}>
			<div className={styles.ledDashboard}>
				<LedPreviewList />
			</div>
		</main>
	);
}
