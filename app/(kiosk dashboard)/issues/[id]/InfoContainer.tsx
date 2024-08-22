import { IndividualKioskMap } from '../../../../components/kioskMap';
import KioskStatusBadge from '../../../../components/kioskStatusBadge';
import { Kiosk } from '../../../../sanity/schemas/documents/kiosk';
import { HealthStatus } from '../../../../types/HealthStatus';
import { KioskObject } from '../../../../types/KioskObjects';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';
import styles from './InfoContainer.module.css';
import IStopIcon from '../../../../components/iStopIcon';
import HasLedSignIcon from '../../../../components/hasLedSignIcon';
import AttributeBadge from '../../../../components/attributeBadge';

interface InfoContainerProps {
	kiosk: Kiosk;
	healthStatus: ServerHealthStatuses | null;
}
export default async function InfoContainer({ kiosk, healthStatus }: InfoContainerProps) {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.content}>
				<div className={styles.attributesIcons}>
					{kiosk.iStop && <AttributeBadge icon={<IStopIcon />} text={'iStop'} />}
					{kiosk.hasLed && <AttributeBadge icon={<HasLedSignIcon />} text={'Has LED Sign'} />}
				</div>
				<h1 className={styles.kioskName}>
					<span>{kiosk && kiosk.displayName}</span>
				</h1>
				<code style={{ fontSize: '200%' }} className={styles.stopId}>
					{kiosk.stopId}
				</code>
				<div className={styles.healthBadges}>
					{healthStatus && (
						<div className={styles.badgeContainer}>
							<KioskStatusBadge large kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} align="left" />
							{kiosk.hasLed && <KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.led} align="left" />}
							<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.lcd} align="left" />
						</div>
					)}
				</div>
			</div>
			<IndividualKioskMap kiosk={kiosk} health={healthStatus?.overallHealth ?? HealthStatus.UNKNOWN} />
		</div>
	);
}
