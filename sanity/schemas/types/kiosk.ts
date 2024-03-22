export default interface Kiosk {
	displayName: string;
	slug: string;
	phoneticName: string;
	stopId: string;
	iStop: boolean;
	location: {
		lat: number;
		lon: number;
	};
	hasLed: boolean;
	ledIp: string;
	_id: string;
}
