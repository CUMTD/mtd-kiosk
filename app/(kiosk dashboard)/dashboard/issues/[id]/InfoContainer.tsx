import { Suspense } from 'react';
import AnnunciatorIcon from '../../../../../components/annunciatorIcon';
import AttributeBadge from '../../../../../components/attributeBadge';
import IStopIcon from '../../../../../components/iStopIcon';
import LedSignIcon from '../../../../../components/ledSignIcon';
import { Kiosk } from '../../../../../sanity.types';
import styles from './InfoContainer.module.css';
import LedPreviewPlaceholder from '../../led/ledPreviewPlaceholder';
import LedPreview from '../../led/ledPreview';
import HealthBadges from './HealthBadges';

interface InfoContainerProps {
	kiosk: Kiosk;
}
export default async function InfoContainer({ kiosk }: InfoContainerProps) {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.content}>
				<code className={styles.stopId}>
					{kiosk.stopId} / {kiosk._id}{' '}
					{kiosk.hasLed && (
						<a href={`http://${kiosk.ledIp}`} target="_blank">
							/ {kiosk.ledIp}
						</a>
					)}
				</code>
				<h1 className={styles.kioskName}>{kiosk && kiosk.displayName}</h1>
				<div className={styles.attributesIcons}>
					{kiosk.iStop && <AttributeBadge icon={<IStopIcon />} text={'iStop'} />}
					{kiosk.hasLed && <AttributeBadge icon={<LedSignIcon />} text={'LED Sign'} />}
					{kiosk.hasAnnunciator && <AttributeBadge icon={<AnnunciatorIcon />} text={'Annunciator'} />}
				</div>
			</div>

			<Suspense fallback={<LedPreviewPlaceholder />}>
				<LedPreview kioskId={kiosk._id} ledIp={kiosk.ledIp!} clickable={false} />
			</Suspense>
			<HealthBadges kiosk={kiosk} />
		</div>
	);
}
