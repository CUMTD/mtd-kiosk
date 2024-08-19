import { fetchKioskBySlug } from '../../../../helpers/httpMethods';
import KioskDisplay from './KioskDisplay';

export default async function KioskDisplayPage({ params }: { params: { slug: string } }) {
	console.log(params.slug);

	const kiosk = await fetchKioskBySlug(params.slug);

	return (
		<main>
			<KioskDisplay kiosk={kiosk} />
		</main>
	);
}
