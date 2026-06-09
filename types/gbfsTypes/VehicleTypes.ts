export default interface VehicleTypes {
	version: string;
	ttl: number;
	last_updated: number;
	data: Data;
}

export interface Data {
	vehicle_types: VehicleType[];
}

export interface VehicleType {
	vehicle_type_id: string;
	form_factor: 'bicycle' | 'cargo_bicycle' | 'car' | 'moped' | 'scooter' | 'scooter_standing' | 'scooter_seated' | 'other';
	propulsion_type: 'human' | 'electric_assist' | 'electric' | 'combustion' | 'combustion_diesel' | 'hybrid' | 'plug_in_hybrid' | 'hydrogen_fuel_cell';
	max_range_meters?: number;
}
