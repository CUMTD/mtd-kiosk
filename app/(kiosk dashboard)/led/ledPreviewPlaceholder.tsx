import { BsX } from 'react-icons/bs';
import styles from './page.module.css';

interface LedPreviewPlaceholderProps {
	failed?: boolean;
}

export default function LedPreviewPlaceholder({ failed }: LedPreviewPlaceholderProps) {
	if (failed) {
		return (
			<div className={styles.failed}>
				<BsX /> Failed to load LED preview
			</div>
		);
	}
	return <div className={styles.placeholder}></div>;
}
