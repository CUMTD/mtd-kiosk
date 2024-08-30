'use server';
import { revalidateTag } from 'next/cache';
import { client } from '../sanity/lib/client';
import KioskTicket, { KioskTicketForm, TicketStatusType } from '../types/kioskTicket';
import throwError from './throwError';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import { Advertisement, Kiosk } from '../sanity.types';
import GroupedRoute, { GeneralMessage, KioskDeparturesAPIResponse } from '../types/kioskDisplayTypes/GroupedRoute';
import DarkModeStatusReponse from '../types/kioskDisplayTypes/DarkModeStatusResponse';

const API_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT is not defined');
const KIOSK_HEALTH_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT not set');

const X_API_KEY = process.env.KIOSK_API_KEY ?? throwError('KIOSK_API_KEY is not defined');

const defaultHeaders = {
	'X-ApiKey': X_API_KEY,
	'Content-Type': 'application/json'
};

export default async function getHealthStatuses(kioskId?: string): Promise<ServerHealthStatuses | ServerHealthStatuses[] | null> {
	if (!kioskId) {
		kioskId = 'all';
	}

	try {
		const response = await fetch(
			kioskId === 'all' ? `${KIOSK_HEALTH_ENDPOINT}/kiosks/health` : `${KIOSK_HEALTH_ENDPOINT}/kiosks/${kioskId}/health`,

			{
				headers: defaultHeaders,
				cache: 'no-cache'
				// next: {
				// 	revalidate: 10000
				// }
			}
		);

		if (kioskId === 'all') {
			const healthStatus = (await response.json()) as ServerHealthStatuses[];
			return healthStatus;
		} else {
			const healthStatus = (await response.json()) as ServerHealthStatuses;
			return healthStatus;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function fetchKioskList() {
	const query = `*[_type == 'kiosk']`;
	const kiosks = await client.fetch(query);

	return kiosks;
}

export async function fetchKioskById(id: string): Promise<Kiosk> {
	const query = `*[_type == 'kiosk' && _id == '${id}'][0]`;
	const kiosk = await client.fetch(query);

	return kiosk;
}

export async function fetchKioskBySlug(slug: string): Promise<Kiosk> {
	const query = `*[_type == 'kiosk' && slug.current == '${slug}'][0]`;
	const kiosk = await client.fetch(query);

	return kiosk;
}

export async function fetchKioskAdsByKioskId(kioskId: string): Promise<Advertisement[]> {
	const query = `*[_type == 'advertisement'
	&& startDate <= $currentDate
  && (!defined(endDate) || endDate >= $currentDate)
  	&& (displayOnAllKiosks || references($kioskId) || references(*[_type == "kioskBundle" && references($kioskId)]._id))
	]
  {
	...,
	"imageUrl": image.asset->url
  }`;
	const currentDate = new Date().toISOString(); // Get the current date in ISO format
	const ads = await client.fetch(query, { kioskId, currentDate }, { cache: 'no-cache' });
	return ads;
}

export async function fetchKioskTickets(id: string) {
	// make fetch request to API_ENDPOINT
	try {
		const response = await fetch(`${API_ENDPOINT}/kiosks/${id}/tickets`, {
			next: {
				tags: ['tickets']
			},
			headers: defaultHeaders
		});
		const data = (await response.json()) as KioskTicket[];

		//sort by date
		// data.sort((a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime());

		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

// returns true if the ticket was successfully updated
export async function createKioskTicket(ticket: KioskTicketForm) {
	const response = await fetch(`${API_ENDPOINT}/tickets`, {
		method: 'POST',
		headers: defaultHeaders,
		body: JSON.stringify(ticket)
	});
	if (response.status === 201) {
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to create ticket');
	return false;
}

export async function createTicketComment(ticketId: string, markdownBody: string, createdBy: string) {
	const response = await fetch(`${API_ENDPOINT}/tickets/${ticketId}/comment`, {
		method: 'POST',
		headers: defaultHeaders,
		body: JSON.stringify({ markdownBody, createdBy })
	});
	// print body

	if (response.ok) {
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to create comment');
	return false;
}

export async function deleteTicketComment(ticketNoteId: string) {
	const response = await fetch(`${API_ENDPOINT}/ticket-notes/${ticketNoteId}`, {
		method: 'DELETE',
		headers: defaultHeaders
	});
	if (response.ok) {
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to delete comment');
	return false;
}

export async function updateTicketComment(ticketNoteId: string, markdownBody: string) {
	const response = await fetch(`${API_ENDPOINT}/ticket-notes/${ticketNoteId}`, {
		method: 'PATCH',
		headers: defaultHeaders,
		body: JSON.stringify({ markdownBody })
	});
	if (response.ok) {
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to update comment');
	return false;
}

export async function updateTicket(ticketId: string, status: TicketStatusType) {
	const response = await fetch(`${API_ENDPOINT}/tickets/${ticketId}/status?newStatus=${status}`, {
		method: 'PATCH',
		headers: defaultHeaders
	});
	if (response.status === 200) {
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to update ticket');
	return false;
}

export async function fetchLEDPreview(ledIp: string) {
	try {
		const response = await fetch(`${API_ENDPOINT}/led-preview?ledIp=${ledIp}`, {
			// returns image/png
			method: 'GET',
			headers: defaultHeaders,
			next: {
				tags: ['ledPreview']
			}
		});
		if (!response.ok) {
			// console.log(response.url);
			// console.error('Failed to fetch LED preview');
			return null;
		}

		const arrayBuffer = await response.arrayBuffer();
		const base64String = Buffer.from(arrayBuffer).toString('base64');
		return `data:image/png;base64,${base64String}`;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getDepartures(stopId: string, kioskId?: string): Promise<GroupedRoute[] | null> {
	try {
		const response = await fetch(`${API_ENDPOINT}/departures/${stopId}/lcd?` + (kioskId ? `kioskId=${kioskId}&` : '') + 'max=7', {
			headers: defaultHeaders
		});

		const data = (await response.json())['groupedDepartures'] as GroupedRoute[];

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getGeneralMessage(stopId: string): Promise<GeneralMessage | null> {
	try {
		const response = await fetch(`${API_ENDPOINT}/general-messaging/lcd?stopId=${stopId}`, {
			headers: defaultHeaders
		});

		if (response.status == 204) {
			return null;
		}

		const data = (await response.json()) as GeneralMessage;

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getDarkModeStatus(): Promise<boolean> {
	try {
		const response = await fetch(`${API_ENDPOINT}/time/dark-mode`, {
			headers: defaultHeaders,
			cache: 'no-cache'
		});

		// returns true if dark mode is enabled
		const result = (await response.json()) as DarkModeStatusReponse;
		return result.useDarkMode;
	} catch (error) {
		console.error(error);
		return true;
	}
}
