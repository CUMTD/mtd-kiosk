// get the kiosk slug from url

import { client } from '../../../../../../sanity/lib/client';
import LedPreview from '../../../led/ledPreview';
import { Kiosk } from '../../../../../../sanity.types';
import styles from './page.module.css';

interface Props {
	params: { id: string };
}

export default async function VirtualKioskPage({ params: { id } }: Readonly<Props>) {
	const kiosk = (await client.fetch(`*[_type == "kiosk" && _id == $id][0]`, { id })) as Kiosk;

	return (
		<div className={styles.container}>
			{kiosk.hasLed && kiosk.ledIp && (
				<div className={styles.ledPreview}>
					<LedPreview kioskId={id} ledIp={kiosk.ledIp} />
				</div>
			)}
			{/* <div className={styles.chassis}> */}
			<iframe
				src={`/kiosks/${kiosk.slug?.current}`}
				title="Virtual Kiosk"
				width="1080"
				height="1920"
				// scale it down
				className={styles.iframe}
			/>
			{/* </div> */}
		</div>
	);
}
