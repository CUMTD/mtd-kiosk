import Image from 'next/image';
import { fetchKioskAdsByKioskId, fetchKioskById, fetchKioskBySlug } from '../../../../../helpers/httpMethods';
import { Advertisement } from '../../../../../sanity.types';
import Link from 'next/link';

export default async function AdsPage({ params }: { params: { slug: string } }) {
	const kiosk = await fetchKioskBySlug(params.slug);
	if (!kiosk) return null;
	const kioskAds = await fetchKioskAdsByKioskId(kiosk._id);

	return (
		<div>
			<h1>Click an ad to Edit</h1>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
				{kioskAds.map((ad: Advertisement) => (
					<Link key={ad._id} href={`/studio/structure/advertisement;${ad._id}`} passHref target="_blank">
						<Image src={ad.imageUrl || ''} alt={ad.name || ''} width={720} height={320} />
					</Link>
				))}
			</div>
		</div>
	);
}
