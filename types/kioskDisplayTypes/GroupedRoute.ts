export default interface GroupedRoute {
	number: string;
	name: string;
	direction: string;
	foregroundHexColor: string;
	backgroundHexColor: string;
	departureTimes: DepartureTime[];
}

export interface KioskDeparturesAPIResponse {
	routes: GroupedRoute[];
	generalMessage: GeneralMessage | null;
}

export interface DepartureTime {
	time: string;
	isRealTime: boolean;
	isHopper: boolean;
}

export interface GeneralMessage {
	blocksRealtime: boolean;
	text: string;
}
