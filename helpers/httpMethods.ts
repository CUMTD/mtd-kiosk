'use server';
import { revalidateTag } from 'next/cache';
import { client } from '../sanity/lib/client';
import KioskTicket, { KioskTicketForm, TicketStatusType } from '../types/kioskTicket';
import throwError from './throwError';

const API_ENDPOINT = process.env.NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT ?? throwError('NEXT_PUBLIC_KIOSK_HEALTH_ENDPOINT is not defined');

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
	const response = await fetch(`${API_ENDPOINT}/kiosk/${id}/tickets`, {
		next: {
			tags: ['tickets']
		}
	});
	const data = (await response.json()) as KioskTicket[];

	//sort by date
	// data.sort((a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime());

	return data;
}

// returns true if the ticket was successfully updated
export async function createKioskTicket(ticket: KioskTicketForm) {
	const response = await fetch(`${API_ENDPOINT}/ticket`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(ticket)
	});
	if (response.status === 201) {
		console.log('Ticket created');
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to create ticket');
	return false;
}

export async function createTicketComment(ticketId: string, markdownBody: string, createdBy: string) {
	const response = await fetch(`${API_ENDPOINT}/ticket/${ticketId}/comment`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ markdownBody, createdBy })
	});
	// print body

	if (response.ok) {
		console.log('Comment created');
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to create comment');
	return false;
}

export async function deleteTicketComment(ticketNoteId: string) {
	const response = await fetch(`${API_ENDPOINT}/ticketnote/${ticketNoteId}`, {
		method: 'DELETE'
	});
	if (response.ok) {
		console.log('Comment deleted');
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to delete comment');
	return false;
}

export async function updateTicketComment(ticketNoteId: string, markdownBody: string) {
	const response = await fetch(`${API_ENDPOINT}/ticketnote/${ticketNoteId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ markdownBody })
	});
	if (response.ok) {
		console.log('Comment updated');
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to update comment');
	return false;
}

export async function updateTicket(ticketId: string, status: TicketStatusType) {
	const response = await fetch(`${API_ENDPOINT}/ticket/${ticketId}/status/${status}`, {
		method: 'PATCH'
	});
	if (response.status === 200) {
		console.log('Ticket updated');
		revalidateTag('tickets');
		return true;
	}
	console.error('Failed to update ticket');
	return false;
}
