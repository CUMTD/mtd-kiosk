type GroupedRoute = {
	number: string;
	name: string;
	direction: string;
	foregroundHexColor: string;
	backgroundHexColor: string;
	isAcrossStreet: boolean;
	departureTimes: DepartureTime[];
};

export type KioskDeparturesAPIResponse = {
	routes: GroupedRoute[];
	generalMessage: GeneralMessage | null;
};

export type DepartureTime = {
	time: string;
	isRealTime: boolean;
	isHopper: boolean;
};

export type GeneralMessage = {
	blocksRealtime: boolean;
	text: string;
};

export default GroupedRoute;
