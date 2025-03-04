'use client';

import Image from 'next/image';
import { useState } from 'react';
import { fetchLEDPreview } from '../../../../helpers/httpMethods';
import styles from './ledPreview.module.css';

interface LedPreviewClientProps {
	initialImage: string;
	ledIp: string;
}

export default function LedPreviewClient({ initialImage, ledIp }: LedPreviewClientProps) {
	const [ledPreviewImg, setLedPreviewImg] = useState(initialImage);

	const refreshPreview = async () => {
		try {
			const newImage = await fetchLEDPreview(ledIp);
			if (newImage) setLedPreviewImg(newImage);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div role="button" tabIndex={0} onClick={refreshPreview} onKeyDown={() => {}} className={styles.previewContainer}>
			<Image src={ledPreviewImg} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
		</div>
	);
}
