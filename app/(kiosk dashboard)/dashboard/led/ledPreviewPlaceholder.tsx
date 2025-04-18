'use client';

import { BsX } from 'react-icons/bs';
import styles from './page.module.css';
import ledStyles from './ledPreview.module.css';

interface LedPreviewPlaceholderProps {
	failed?: boolean;
}

export default function LedPreviewPlaceholder({ failed }: LedPreviewPlaceholderProps) {
	if (failed) {
		return (
			<div className={ledStyles.previewContainer}>
				<div className={styles.failed}>
					<BsX /> Failed to load LED preview
				</div>
			</div>
		);
	}
	return (
		<div className={ledStyles.previewContainer}>
			<div className={styles.placeholder}></div>
		</div>
	);
}
