import { atom, selector } from 'recoil';
import { KioskTicketForm } from '../types/kioskTicket';

export const newIssueKioskIdState = atom<string>({
	key: 'newIssueKioskIdState',
	default: ''
});

export const newIssueTicketState = atom<KioskTicketForm>({
	key: 'newIssueTicketState',
	default: {
		kioskId: '',
		openedBy: '',
		description: '',
		title: ''
	}
});

export const newIssueTicketValidSelector = selector<boolean>({
	key: 'newIssueTicketValid',
	get: ({ get }) => {
		const ticket = get(newIssueTicketState);
		return ticket.title.length > 0 && ticket.description.length > 0;
	}
});
