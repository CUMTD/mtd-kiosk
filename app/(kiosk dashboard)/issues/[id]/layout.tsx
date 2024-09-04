import { Suspense } from 'react';
import KioskCards from '../../../../components/kioskCards';
import getHealthStatuses, { fetchKioskById, fetchKioskList } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity/schemas/documents/kiosk';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';
import LedPreview from '../../led/ledPreview';
import LedPreviewPlaceholder from '../../led/ledPreviewPlaceholder';
import AdsPreview from './AdsPreview';
import InfoContainer from './InfoContainer';
import styles from './layout.module.css';

export default async function IssueLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
	const kiosk = (await fetchKioskById(params.id)) as Kiosk;
	const healthStatus = (await getHealthStatuses(params.id)) as ServerHealthStatuses;
	const healthStatuses = (await getHealthStatuses()) as ServerHealthStatuses[];

	const kiosks = await fetchKioskList();

	return (
		<>
			<section className={styles.parent}>
				{/* <Link href="/" passHref style={{ width: 'fit-content' }}>
					<AttributeBadge icon={<BiSolidLeftArrow />} text="Back to Dashboard" />
				</Link> */}
				<InfoContainer kiosk={kiosk} healthStatus={healthStatus} />
				{kiosk.hasLed && kiosk.ledIp.length > 0 && (
					<div className={styles.children}>
						<h2 style={{ paddingBottom: '1em' }}>LED Preview</h2>
						<Suspense fallback={<LedPreviewPlaceholder />}>{<LedPreview ledIp={kiosk.ledIp} clickable={false} />}</Suspense>
					</div>
				)}
				<div className={styles.children}>
					<AdsPreview kioskId={kiosk._id} />
				</div>

				<div className={styles.children}>{children}</div>
			</section>

			<aside className={styles.kioskCards}>
				<KioskCards kiosks={kiosks} readonly healthStatuses={healthStatuses} />
			</aside>
		</>
	);
}
