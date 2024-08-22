import { Suspense } from 'react';
import { client } from '../../../sanity/lib/client';
import LedPreview from './ledPreview';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import styles from './page.module.css';
import { Kiosk } from '../../../sanity.types';

export default async function LedPreviewList() {
	const query = `*[_type == 'kiosk' && defined(ledIp)] | order(displayName asc) {ledIp, _id, displayName}`;
	var ledIps: Kiosk[] = await client.fetch(query);

	//filter out empty ledIp
	ledIps = ledIps.filter((ledIp: Kiosk) => {
		return ledIp.ledIp !== '';
	});

	return ledIps.map((kiosk: Kiosk) => {
		return (
			<div key={kiosk.ledIp}>
				<p className={styles.displayName}>{kiosk.displayName}</p>
				<div className={styles.frame}>
					<Suspense fallback={<LedPreviewPlaceholder />}>
						<LedPreview ledIp={kiosk.ledIp ?? ''} kioskGUID={kiosk._id} clickable />
					</Suspense>
				</div>
			</div>
		);
	});
}
