'use server';
import { client } from '../sanity/lib/client';

export default async function fetchKioskList() {
	const query = `*[_type == 'kiosk']`;
	const kiosks = await client.fetch(query);

	return kiosks;
}
