export default interface KioskTicket {
	id: string;
	kioskId: string;
	status: TicketStatusType;
	openDate: string;
	closeDate: string | null;
	openedBy: string;
	description: string;
	title: string;
	ticketNotes: TicketNote[];
}

export enum TicketStatusType {
	OPEN = 0,
	ONHOLD = 1,
	RESOLVED = 2
}

export interface KioskTicketForm {
	kioskId: string;
	openedBy: string;
	description: string;
	title: string;
}

export interface TicketNote {
	markdownBody: string;
	ticketId: string;
	createdDate: string;
	createdBy: string;
	id: string;
	deleted: boolean;
}
