import Image from 'next/image';
import Link from 'next/link';
import { fetchLEDPreview } from '../../../../helpers/httpMethods';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import LedPreviewClient from './ledPreviewClient';
import styles from './ledPreview.module.css';

interface LedPreviewProps {
	kioskId: string;
	ledIp: string;
	clickable?: boolean;
}

export default async function LedPreview({ kioskId, ledIp, clickable }: LedPreviewProps) {
	let ledPreviewImg: string | null = null;

	try {
		ledPreviewImg = await fetchLEDPreview(ledIp);
	} catch (error) {
		console.error(error);
	}

	if (!ledPreviewImg) {
		return <LedPreviewPlaceholder failed />;
	}

	if (clickable) {
		return (
			<div>
				<Link href={`/dashboard/issues/${kioskId}`} className={styles.previewContainer} target="_blank">
					<Image src={ledPreviewImg} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
				</Link>
			</div>
		);
	} else {
		return <LedPreviewClient initialImage={ledPreviewImg} ledIp={ledIp} />;
	}
}
