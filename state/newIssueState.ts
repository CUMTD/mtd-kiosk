import { atom } from 'jotai';
import { KioskTicketForm } from '../types/kioskTicket';

export const newIssueKioskIdState = atom<string>('');

export const newIssueTicketState = atom<KioskTicketForm>({
	kioskId: '',
	openedBy: '',
	description: '',
	title: ''
});

export const newIssueTicketValidSelector = atom<boolean>((get) => {
	const ticket = get(newIssueTicketState);
	return ticket.title.length > 0 && ticket.description.length > 0;
});
