import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { Advertisement } from '../../../sanity.types';
import { calculateAdStatus } from '../../../helpers/calculateAdStatus';

export async function GET(request: NextRequest) {
	const authHeader = request.headers.get('authorization');
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401
		});
	}
	console.log('Running cron job...');
	const ads = (await client.fetch('*[_type == "advertisement"]')) as Advertisement[];

	for (const ad of ads) {
		const currentStatus = ad.status;
		const updatedStatus = calculateAdStatus(ad);
		if (currentStatus !== updatedStatus) {
			client.patch(ad._id).set({ status: updatedStatus }).commit();
		}
	}

	return NextResponse.json({ ok: true });
}
