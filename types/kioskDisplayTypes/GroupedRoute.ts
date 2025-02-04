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
	vehicleId: string | null;
	tripId: string;
	isRealTime: boolean;
	isHopper: boolean;
	modifier: string;
};

export type GeneralMessage = {
	blockRealtime: boolean;
	text: string;
};

export default GroupedRoute;
