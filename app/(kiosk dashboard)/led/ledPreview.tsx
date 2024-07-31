import { fetchLEDPreview } from '../../../helpers/httpMethods';
import Image from 'next/image';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import styles from './page.module.css';
import Link from 'next/link';

interface LedPreviewProps {
	ledIp: string;
	kioskGUID?: string;
}

export default async function LedPreview({ ledIp, kioskGUID }: LedPreviewProps) {
	var ledPreview = await fetchLEDPreview(ledIp);

	if (!ledPreview) {
		return <LedPreviewPlaceholder failed />;
	}

	return (
		<div>
			<Link href={kioskGUID ? `/issues/${kioskGUID}` : ''} className={styles.previewContainer} target="_blank">
				<Image src={ledPreview} className={styles.previewImage} alt="LED Preview" width={600} height={75} />
			</Link>
		</div>
	);
}
