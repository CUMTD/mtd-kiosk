import { NextResponse } from 'next/server';
import { client } from '../../../sanity/lib/client';
import { Advertisement } from '../../../sanity.types';

export async function GET() {
	client.fetch('*[_type == "advertisement"]').then((ads) => {
		for (const ad of ads) {
			const currentStatus = ad.status;
			const updatedStatus = calculateAdStatus(ad);
			if (currentStatus !== updatedStatus) {
				client.patch(ad._id).set({ status: updatedStatus }).commit();
			}
		}
	});

	return NextResponse.json({ ok: true });
}

export function calculateAdStatus(advertisement: Advertisement) {
	const newStartDate = new Date(advertisement.startDate ?? '');
	const newEndDate = new Date(advertisement.endDate ?? '');
	const now = new Date();

	if (newStartDate > now) {
		return 1;
	} else if (newEndDate < now) {
		return 2;
	} else {
		return 0;
	}
}
