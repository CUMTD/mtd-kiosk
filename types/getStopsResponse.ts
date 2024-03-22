export interface GetStopsReponse {
	time: string;
	changeset_id: string;
	new_changeset: boolean;
	status: Status;
	rqst: Rqst;
	stops: Stop[];
}

export interface Status {
	code: number;
	msg: string;
}

export interface Rqst {
	method: string;
	params: Params;
}

export interface Params {}

export interface Stop {
	stop_id: string;
	stop_name: string;
	code: string;
	distance: number;
	stop_points: StopPoint[];
}

export interface StopPoint {
	code: string;
	stop_id: string;
	stop_lat: number;
	stop_lon: number;
	stop_name: string;
}
