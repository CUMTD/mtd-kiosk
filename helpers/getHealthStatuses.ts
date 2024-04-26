'use server';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import throwError from './throwError';

const KIOSK_HEALTH_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT not set');

export default async function getHealthStatuses(kioskId: string): Promise<ServerHealthStatuses | null> {
	try {
		const response = await fetch(
			`${KIOSK_HEALTH_ENDPOINT}/kiosk/${kioskId}/health`,

			{
				cache: 'no-cache'
				// next: {
				// 	revalidate: 10000
				// }
			}
		);
		const healthStatus = (await response.json()) as ServerHealthStatuses;
		// console.log(healthStatus);
		return healthStatus;
	} catch (error) {
		console.error(error);

		return null;
	}
}
