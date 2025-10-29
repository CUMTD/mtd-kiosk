export default interface FreeBikeStatus {
	version: string;
	ttl: number;
	last_updated: number;
	data: Data;
}

export interface Data {
	bikes: Bike[];
}

export interface Bike {
	bike_id: string;
	lat: number;
	lon: number;
	is_reserved: boolean;
	is_disabled: boolean;
	rental_uris: RentalUris;
	vehicle_type_id: string;
	pricing_plan_id: string;
	current_range_meters: number;
}

export interface RentalUris {
	android: string;
	ios: string;
}
