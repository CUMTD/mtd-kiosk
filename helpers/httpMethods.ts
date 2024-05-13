'use server';
import { revalidateTag } from 'next/cache';
import { client } from '../sanity/lib/client';
import KioskTicket, { KioskTicketForm, TicketStatusType } from '../types/kioskTicket';
import throwError from './throwError';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';

const API_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT is not defined');
const KIOSK_HEALTH_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT not set');

const X_API_KEY = process.env.NEXT_PUBLIC_KIOSK_API_KEY ?? throwError('NEXT_PUBLIC_KIOSK_API_KEY is not defined');

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
			`${KIOSK_HEALTH_ENDPOINT}/kiosk/${kioskId}/health`,

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

export async function fetchKiosk(id: string) {
	const query = `*[_type == 'kiosk' && _id == '${id}'][0]`;
	const kiosk = await client.fetch(query);

	return kiosk;
}

export async function fetchKioskTickets(id: string) {
	// make fetch request to API_ENDPOINT
	try {
		const response = await fetch(`${API_ENDPOINT}/kiosk/${id}/tickets`, {
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
	const response = await fetch(`${API_ENDPOINT}/ticket`, {
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
	const response = await fetch(`${API_ENDPOINT}/ticket/${ticketId}/comment`, {
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
	const response = await fetch(`${API_ENDPOINT}/ticket-note/${ticketNoteId}`, {
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
	const response = await fetch(`${API_ENDPOINT}/ticket-note/${ticketNoteId}`, {
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
	const response = await fetch(`${API_ENDPOINT}/ticket/${ticketId}/status/${status}`, {
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
