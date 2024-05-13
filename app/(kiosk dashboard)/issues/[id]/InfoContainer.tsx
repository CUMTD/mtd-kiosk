import { GoLinkExternal } from 'react-icons/go';
import { IndividualKioskMap } from '../../../../components/kioskMap';
import KioskStatusBadge from '../../../../components/kioskStatusBadge';
import { Kiosk } from '../../../../sanity/schemas/documents/kiosk';
import { HealthStatus } from '../../../../types/HealthStatus';
import { KioskObject } from '../../../../types/KioskObjects';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';
import styles from './InfoContainer.module.css';
import Link from 'next/link';

interface InfoContainerProps {
	kiosk: Kiosk;
	healthStatus: ServerHealthStatuses | null;
}
export default async function InfoContainer({ kiosk, healthStatus }: InfoContainerProps) {
	return (
		<div className={styles.infoContainer}>
			<IndividualKioskMap kiosk={kiosk} health={healthStatus?.overallHealth ?? HealthStatus.UNKNOWN} />
			<div className={styles.content}>
				<h1 className={styles.kioskName}>
					<span>
						{kiosk && kiosk.displayName} <code className={styles.stopId}>{kiosk.stopId}</code>
					</span>
				</h1>
				<div>
					{healthStatus && (
						<div className={styles.badgeContainer}>
							<KioskStatusBadge large kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} />
							<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.button} />
							<KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.button} />
						</div>
					)}
				</div>
				<Link href={`http://${kiosk.ledIp}/site`} target="_blank" className={styles.ipSignlink}>
					Manage LED Sign <GoLinkExternal />
				</Link>
			</div>
		</div>
	);
}
