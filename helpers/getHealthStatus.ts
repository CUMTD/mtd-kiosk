'use server';
import { HealthStatus } from '../types/HealthStatus';
import { KioskObject } from '../types/KioskObjects';
import throwError from './throwError';

const KIOSK_HEALTH_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT not set');

export default async function getStatus(kioskId: string, kioskObj: KioskObject): Promise<HealthStatus> {
	try {
		const response = await fetch(
			`${KIOSK_HEALTH_ENDPOINT}/kiosk/${kioskId}/health/${KioskObject[kioskObj].toLowerCase()}`,

			{
				// cache: 'no-store'
				next: {
					revalidate: 10000
				}
			}
		);
		const healthStatus = await response.json();
		return healthStatus as HealthStatus;
	} catch (error) {
		console.error(error);

		return HealthStatus.UNKNOWN;
	}
}
