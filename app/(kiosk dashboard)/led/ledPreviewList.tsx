import { Suspense } from 'react';
import { Kiosk } from '../../../sanity.types';
import { client } from '../../../sanity/lib/client';
import LedPreview from './ledPreview';
import LedPreviewPlaceholder from './ledPreviewPlaceholder';
import styles from './page.module.css';

// define a type based on the props we are requesting from the GROQ query.
// this is a subset of the Kiosk type, with only the fields we need.
// Wrap in a required since we are checking in the query to filter out kiosks without ledIp.
type FilteredKiosk = Required<Pick<Kiosk, 'ledIp' | '_id' | 'displayName'>>;

export default async function LedPreviewList() {
	const query = `*[_type == 'kiosk' && defined(ledIp) && ledIp != null && length(ledIp) > 0] | order(displayName asc) {ledIp, _id, displayName}`;

	var kiosks = await client.fetch<FilteredKiosk[]>(query);

	return kiosks.map(({ _id: id, displayName, ledIp }) => {
		return (
			<div key={ledIp}>
				<p className={styles.displayName}>{displayName}</p>
				<div className={styles.frame}>
					<Suspense fallback={<LedPreviewPlaceholder />}>
						<LedPreview ledIp={ledIp} kioskId={id} clickable />
					</Suspense>
				</div>
			</div>
		);
	});
}
