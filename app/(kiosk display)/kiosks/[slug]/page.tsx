import { fetchKioskBySlug } from '../../../../helpers/httpMethods';
import KioskDisplayRoot from './KioskDisplayRoot';

export default async function KioskDisplayPage({ params }: { params: { slug: string } }) {
	const kiosk = await fetchKioskBySlug(params.slug);
	return (
		<main>
			<KioskDisplayRoot horizontal={kiosk?.isHorizontal} kiosk={kiosk} />
		</main>
	);
}
