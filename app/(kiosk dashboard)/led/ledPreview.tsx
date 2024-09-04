import Image from 'next/image';
import Link from 'next/link';
import { fetchLEDPreview } from '../../../helpers/httpMethods';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import styles from './page.module.css';

interface LedPreviewProps {
	ledIp: string;
	kioskGUID?: string;
	clickable?: boolean;
}

export default async function LedPreview({ ledIp, kioskGUID, clickable }: LedPreviewProps) {
	var ledPreview = await fetchLEDPreview(ledIp);

	if (!ledPreview) {
		return <LedPreviewPlaceholder failed />;
	}

	if (!clickable) {
		return (
			<div>
				<Image src={ledPreview} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
			</div>
		);
	} else {
		return (
			<div>
				<Link href={`/issues/${kioskGUID}`} className={styles.previewContainer} target="_blank">
					<Image src={ledPreview} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
				</Link>
			</div>
		);
	}
}
