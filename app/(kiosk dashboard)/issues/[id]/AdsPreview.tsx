import Image from 'next/image';
import { fetchKioskAdsByKioskId, fetchKioskById, fetchKioskBySlug } from '../../../../helpers/httpMethods';
import { Advertisement } from '../../../../sanity.types';
import Link from 'next/link';
import { GiLightBulb } from 'react-icons/gi';

interface AdsPageProps {
	kioskId: string;
}

export default async function AdsPreview({ kioskId }: AdsPageProps) {
	const kiosk = await fetchKioskById(kioskId);
	if (!kiosk) return null;
	const kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em', paddingBottom: '1em', justifyContent: 'space-between' }}>
				<h2>Ads</h2>
				<p
					style={{
						opacity: '0.8',

						gap: '.5ch',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<GiLightBulb /> Click on an ad to edit it in the studio
				</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
				{kioskAds.map((ad: Advertisement) => (
					<Link key={ad._id} href={`/studio/structure/advertisement;${ad._id}`} passHref target="_blank">
						<Image src={ad.imageUrl || ''} alt={ad.name || ''} width={360} height={160} />
					</Link>
				))}
			</div>
		</div>
	);
}
