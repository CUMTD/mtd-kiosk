import LedPreviewList from './ledPreviewList';
import styles from './page.module.css';

// export metadata for the page
export const metadata = {
	title: 'LED Dashboard'
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
