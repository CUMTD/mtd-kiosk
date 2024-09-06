import { fetchKioskBySlug } from '../../../../helpers/httpMethods';
import { KioskDisplay } from './KioskDisplay';
import KioskDisplayRoot from './KioskDisplayRoot';

export default async function Page({ params }: { params: { slug: string } }) {
	const kiosk = await fetchKioskBySlug(params.slug);
	return (
		<main>
			<KioskDisplayRoot>
				<KioskDisplay kiosk={kiosk} horizontal={kiosk?.isHorizontal ?? false} />
			</KioskDisplayRoot>
		</main>
	);
}
