export default interface SystemInformation {
	version: string;
	ttl: number;
	last_updated: number;
	data: Data;
}

export interface Data {
	system_id: string;
	language: string;
	name: string;
	url: string;
	phone_number: string;
	email: string;
	timezone: string;
	rental_apps: RentalApps;
}

export interface RentalApps {
	android: Android;
	ios: Ios;
}

export interface Android {
	store_uri: string;
	discovery_uri: string;
}

export interface Ios {
	store_uri: string;
	discovery_uri: string;
}
