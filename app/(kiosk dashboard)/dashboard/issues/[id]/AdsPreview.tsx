import Image from 'next/image';
import Link from 'next/link';
import { fetchKioskAdsByKioskId, fetchKioskById } from '../../../../../helpers/httpMethods';
import styles from './AdsPreview.module.css';

interface AdsPageProps {
	kioskId: string;
}

export default async function AdsPreview({ kioskId }: AdsPageProps) {
	const kiosk = await fetchKioskById(kioskId);
	const kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	if (!kiosk) {
		return null;
	}

	return (
		<div>
			<div className={styles.adsSection}>
				<h2>Ads</h2>
				<p className={styles.proTip}>Click on an ad for more details.</p>
			</div>
			<div className={styles.adContainer}>
				{kioskAds.map(({ _id: id, name, imageUrl }) => (
					<Link key={id} href={`/studio/structure/advertisement;${id}`} passHref target="_blank" className={styles.adLink}>
						<Image src={imageUrl || ''} alt={name || ''} width={360} height={160} />
					</Link>
				))}
			</div>
		</div>
	);
}
