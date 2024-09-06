import Image from 'next/image';
import Link from 'next/link';
import { fetchLEDPreview } from '../../../helpers/httpMethods';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import styles from './page.module.css';

interface LedPreviewProps {
	kioskId: string;
	ledIp: string;
	clickable?: boolean;
}

export default async function LedPreview({ kioskId, ledIp, clickable }: LedPreviewProps) {
	const ledPreviewImg = await fetchLEDPreview(ledIp);

	if (!ledPreviewImg) {
		return <LedPreviewPlaceholder failed />;
	}

	if (clickable) {
		return (
			<div>
				<Link href={`/issues/${kioskId}`} className={styles.previewContainer} target="_blank">
					<Image src={ledPreviewImg} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
				</Link>
			</div>
		);
	} else {
		return (
			<div>
				<Image src={ledPreviewImg} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
			</div>
		);
	}
}
