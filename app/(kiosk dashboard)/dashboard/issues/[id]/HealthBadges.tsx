import KioskStatusBadge from '../../../../../components/kioskStatusBadge';
import { Kiosk } from '../../../../../sanity.types';
import { KioskObject } from '../../../../../types/KioskObjects';
import { getHealthStatus } from '../../../../../helpers/httpMethods';

interface HealthBadgesProps {
	kiosk: Kiosk;
}

export default async function HealthBadges({ kiosk }: HealthBadgesProps) {
	const healthStatus = await getHealthStatus(kiosk._id);
	return (
		<table>
			<tbody>
				{kiosk.hasAnnunciator && (
					<tr>
						<td>
							<KioskStatusBadge kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} align="right" />
						</td>
					</tr>
				)}
				{kiosk.hasLed && (
					<tr>
						<td>
							<KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.led} align="right" />
						</td>
					</tr>
				)}
				<tr>
					<td>
						<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.lcd} align="right" />
					</td>
				</tr>
			</tbody>
		</table>
	);
}
