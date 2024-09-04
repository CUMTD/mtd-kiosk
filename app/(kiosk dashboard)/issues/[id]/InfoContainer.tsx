import AttributeBadge from '../../../../components/attributeBadge';
import HasLedSignIcon from '../../../../components/hasLedSignIcon';
import IStopIcon from '../../../../components/iStopIcon';
import { IndividualKioskMap } from '../../../../components/kioskMap';
import KioskStatusBadge from '../../../../components/kioskStatusBadge';
import { Kiosk } from '../../../../sanity.types';
import { HealthStatus } from '../../../../types/HealthStatus';
import { KioskObject } from '../../../../types/KioskObjects';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';
import styles from './InfoContainer.module.css';

interface InfoContainerProps {
	kiosk: Kiosk;
	healthStatus: ServerHealthStatuses | null;
}
export default async function InfoContainer({ kiosk, healthStatus }: InfoContainerProps) {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.content}>
				<code style={{ fontSize: '200%' }} className={styles.stopId}>
					{kiosk.stopId} / {kiosk._id}
				</code>
				<h1 className={styles.kioskName}>
					<span>{kiosk && kiosk.displayName}</span>
				</h1>
				<div className={styles.attributesIcons}>
					{kiosk.iStop && <AttributeBadge icon={<IStopIcon />} text={'iStop'} />}
					{kiosk.hasLed && <AttributeBadge icon={<HasLedSignIcon />} text={'Has LED Sign'} />}
				</div>
				<div className={styles.healthBadges}>
					{healthStatus && (
						<AttributeBadge
							icon={
								<div className={styles.badgeContainer}>
									<KioskStatusBadge kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} align="left" />
									{kiosk.hasLed && <KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.led} align="left" />}
									<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.lcd} align="left" />
								</div>
							}
						/>
					)}
				</div>
			</div>
			<IndividualKioskMap kiosk={kiosk} health={healthStatus?.overallHealth ?? HealthStatus.UNKNOWN} />
		</div>
	);
}
