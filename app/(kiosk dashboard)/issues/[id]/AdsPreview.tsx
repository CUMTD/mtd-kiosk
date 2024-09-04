import Image from 'next/image';
import { fetchKioskAdsByKioskId, fetchKioskById, fetchKioskBySlug } from '../../../../helpers/httpMethods';
import { Advertisement } from '../../../../sanity.types';
import Link from 'next/link';
import { GiLightBulb } from 'react-icons/gi';
import styles from './AdsPreview.module.css';

interface AdsPageProps {
	kioskId: string;
}

export default async function AdsPreview({ kioskId }: AdsPageProps) {
	const kiosk = await fetchKioskById(kioskId);
	if (!kiosk) return null;
	const kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	return (
		<div>
			<div className={styles.adsSection}>
				<h2>Ads</h2>
				<p className={styles.proTip}>
					<GiLightBulb /> Click on an ad to edit it in the studio
				</p>
			</div>
			<div className={styles.adContainer}>
				{kioskAds.map(
					(
						ad: Advertisement // todo: make extended advertisement type for groq query
					) => (
						<Link key={ad._id} href={`/studio/structure/advertisement;${ad._id}`} passHref target="_blank" className={styles.adLink}>
							<Image src={ad.imageUrl || ''} alt={ad.name || ''} width={360} height={160} />
						</Link>
					)
				)}
			</div>
		</div>
	);
}
