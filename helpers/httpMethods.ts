'use server';

import { revalidateTag } from 'next/cache';
import { Advertisement, Kiosk, LayoutClass } from '../sanity.types';
import { client } from '../sanity/lib/client';
import IconMessageWithImages from '../types/groqQueryTypes/IconMessageWithImages';
import DarkModeStatusResponse from '../types/kioskDisplayTypes/DarkModeStatusResponse';
import GroupedRoute, { GeneralMessage } from '../types/kioskDisplayTypes/GroupedRoute';
import KioskTicket, { KioskTicketForm, TicketStatusType } from '../types/kioskTicket';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import throwError from './throwError';

const API_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT is not defined');
const KIOSK_HEALTH_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT not set');

const X_API_KEY = process.env.KIOSK_API_KEY ?? throwError('KIOSK_API_KEY is not defined');

const defaultCache = { next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 600 } };

const defaultHeaders = {
	'X-ApiKey': X_API_KEY,
	'Content-Type': 'application/json'
};

export async function getHealthStatus(kioskId: string): Promise<ServerHealthStatuses | null> {
	const uri = `${KIOSK_HEALTH_ENDPOINT}/kiosks/${kioskId}/health`;
	try {
		const response = await fetch(uri, {
			headers: defaultHeaders,
			cache: 'no-cache'
		});
		const healthStatus = (await response.json()) as ServerHealthStatuses;
		return healthStatus;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function getHealthStatuses(): Promise<ServerHealthStatuses[] | null> {
	try {
		const response = await fetch(`${KIOSK_HEALTH_ENDPOINT}/kiosks/health`, {
			headers: defaultHeaders,
			cache: 'no-cache'
		});

		const healthStatus = (await response.json()) as ServerHealthStatuses[];
		return healthStatus;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function fetchKioskLocations(): Promise<Kiosk[]> {
	const query = `*[_type == 'kiosk'] {location, _id}`;
	const kiosks = await client.fetch(query, {}, defaultCache);

	return kiosks;
}

export async function fetchKioskList(): Promise<Kiosk[]> {
	const query = `*[_type == 'kiosk']`;
	const kiosks = await client.fetch(query, {}, defaultCache);

	return kiosks;
}

export async function fetchKioskById(id: string): Promise<Kiosk> {
	const query = `*[_type == 'kiosk' && _id == '${id}'][0]`;
	const kiosk = await client.fetch<Kiosk>(query);

	return kiosk;
}

type KioskWithClassName = Kiosk & { layoutClass?: { className: string; customCss?: string } };

export async function fetchKioskBySlug(slug: string): Promise<KioskWithClassName> {
	const query = `
	*[_type == 'kiosk' && slug.current == '${slug}'][0]{
		...,
		layoutClass-> {
			className,
			"customCss": customCss.code
		}
	}`;

	const kiosk = await client.fetch<KioskWithClassName>(query, {}, defaultCache);

	return kiosk;
}

export async function fetchKioskIconMessagesByKioskId(kioskId: string): Promise<IconMessageWithImages[]> {
	// console.log(kioskId);
	const query = `*[_type == 'iconMessage' && (
  displayOnAllKiosks ||
  references($kioskId) ||
references(*[_type == "kioskBundle" && references($kioskId)]._id))] {
  ...,
  "lightModeImageUrl": lightModeSvg.asset->url,
  "darkModeImageUrl": darkModeSvg.asset->url
}
`;
	const iconMessages = await client.fetch(
		query,
		{ kioskId },
		{
			next: {
				revalidate: 3600
			}
		}
	);

	return iconMessages;
}

export type AdsWithImageUrl = Advertisement & { imageUrl: string };

export async function fetchKioskAdsByKioskId(kioskId: string): Promise<AdsWithImageUrl[]> {
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
	const ads = await client.fetch<AdsWithImageUrl[]>(query, { kioskId, currentDate }, defaultCache);
	return ads;
}

export async function fetchKioskLayoutClassesByKioskId(kioskId: string): Promise<LayoutClass[]> {
	const query = `*[_type == 'layoutClass'
						&& (references($kioskId) || references(*[_type == "kioskBundle" && references($kioskId)]._id))
						&& active
					]
					{
						...,
					}`;
	const layoutClasses = await client.fetch<LayoutClass[]>(query, { kioskId }, defaultCache);
	return layoutClasses;
}

export async function fetchKioskTickets(id: string): Promise<KioskTicket[]> {
	const uri = `${API_ENDPOINT}/kiosks/${id}/tickets`;
	try {
		const response = await fetch(uri, {
			next: {
				tags: ['tickets']
			},
			headers: defaultHeaders
		});
		return (await response.json()) as KioskTicket[];
	} catch (error) {
		console.error(error);
		return [];
	}
}

// returns true if the ticket was successfully updated
export async function createKioskTicket(ticket: KioskTicketForm): Promise<boolean> {
	const uri = `${API_ENDPOINT}/tickets`;
	try {
		const response = await fetch(uri, {
			method: 'POST',
			headers: defaultHeaders,
			body: JSON.stringify(ticket)
		});
		if (response.status === 201) {
			revalidateTag('tickets');
			return true;
		} else {
			const body = await response.json();
			console.warn('Failed to create ticket with status', { statusCode: response.status, body });
			return false;
		}
	} catch (error) {
		console.error('failed to create ticket with error', error);
		return false;
	}
}

export async function createTicketComment(ticketId: string, markdownBody: string, createdBy: string): Promise<boolean> {
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

export async function deleteTicketComment(ticketNoteId: string): Promise<boolean> {
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

export async function updateTicketComment(ticketNoteId: string, markdownBody: string): Promise<boolean> {
	const uri = `${API_ENDPOINT}/ticket-notes/${ticketNoteId}`;
	const response = await fetch(uri, {
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

export async function updateTicket(ticketId: string, status: TicketStatusType): Promise<boolean> {
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

export async function fetchLEDPreview(ledIp: string): Promise<string | null> {
	try {
		const response = await fetch(`${API_ENDPOINT}/led-preview?ledIp=${ledIp}`, {
			// returns image/png
			method: 'GET',
			headers: defaultHeaders,
			cache: 'no-cache',
			next: {
				tags: ['ledPreview']
			}
			// signal: AbortSignal.timeout(9000)
		});
		if (!response.ok) {
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

export async function getDepartures(primaryStopId: string, additionalStopIds: string[], kioskId?: string): Promise<GroupedRoute[] | null> {
	try {
		const params = new URLSearchParams();

		for (const stopId of additionalStopIds) {
			params.append('additionalStopIds', stopId);
		}

		if (kioskId) {
			params.append('kioskId', kioskId);
		}
		params.append('max', '50');

		const response = await fetch(`${API_ENDPOINT}/departures/${primaryStopId}/lcd?${params.toString()}`, {
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
		const result = (await response.json()) as DarkModeStatusResponse;
		return result.useDarkMode;
	} catch (error) {
		console.error(error);
		return true;
	}
}
