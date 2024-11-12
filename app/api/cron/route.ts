import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { Advertisement } from '../../../sanity.types';
import { calculateAdStatus } from '../../../helpers/calculateAdStatus';

export async function GET() {
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
