/* eslint-disable no-unused-vars */

type KioskTicket = {
	id: string;
	kioskId: string;
	status: TicketStatusType;
	openDate: string;
	closeDate: string | null;
	openedBy: string;
	description: string;
	title: string;
	notes: TicketNote[];
};

export enum TicketStatusType {
	OPEN = 0,
	ONHOLD = 1,
	RESOLVED = 2
}

export type KioskTicketForm = {
	kioskId: string;
	openedBy: string;
	description: string;
	title: string;
};

export type TicketNote = {
	markdownBody: string;
	ticketId: string;
	createdDate: string;
	createdBy: string;
	id: string;
	deleted: boolean;
};

export default KioskTicket;
