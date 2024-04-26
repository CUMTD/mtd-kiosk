import { IndividualKioskMap } from '../../../components/kioskMap';
import KioskStatusBadge from '../../../components/kioskStatusBadge';
import { Kiosk } from '../../../sanity/schemas/documents/kiosk';
import { KioskObject } from '../../../types/KioskObjects';
import { ServerHealthStatuses } from '../../../types/serverHealthStatuses';
import styles from './InfoContainer.module.css';
interface InfoContainerProps {
	kiosk: Kiosk;
	healthStatus: ServerHealthStatuses | null;
}
export default async function InfoContainer({ kiosk, healthStatus }: InfoContainerProps) {
	return (
		<div className={styles.infoContainer}>
			<IndividualKioskMap kiosk={kiosk} />
			<div className={styles.content}>
				<h1 className={styles.kioskName}>
					<span>
						{kiosk && kiosk.displayName} <code className={styles.stopId}>{kiosk.stopId}</code>
					</span>
				</h1>
				{kiosk.ledIp}

				<div className={styles.badgeContainer}>
					<KioskStatusBadge large kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} />
					<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.button} />
					<KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.button} />
				</div>
			</div>
		</div>
	);
}
