import {
	fetchKioskAdsByKioskId,
	fetchKioskBySlug,
	fetchKioskIconMessagesByKioskId,
	fetchKioskLayoutClassesByKioskId,
	getDepartures
} from '../../../../helpers/httpMethods';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';
import { KioskDisplay } from './KioskDisplay';
import KioskDisplayRoot from './KioskDisplayRoot';

export const revalidate = 30;

export default async function Page({ params }: { params: { slug: string } }) {
	const kiosk = await fetchKioskBySlug(params.slug);
	const { _id: id, stopId, additionalStopIds } = kiosk;
	let departures: GroupedRoute[] | null = null;
	if (stopId && stopId.length > 0) {
		departures = await getDepartures(stopId, additionalStopIds ?? [], undefined);
	}

	const ads = await fetchKioskAdsByKioskId(id);
	const iconMessages = await fetchKioskIconMessagesByKioskId(id);
	const layoutClass = await fetchKioskLayoutClassesByKioskId(id);

	const mainClass = layoutClass[0]?.className ?? '';
	const customCss = layoutClass[0]?.customCss?.code ?? '';

	return (
		<>
			{customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
			<main className={mainClass}>
				<KioskDisplayRoot kiosk={kiosk} departures={departures} ads={ads} iconMessages={iconMessages}>
					<KioskDisplay />
				</KioskDisplayRoot>
			</main>
		</>
	);
}
