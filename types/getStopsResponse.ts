export type GetStopsResponse = {
	time: string;
	changeset_id: string;
	new_changeset: boolean;
	status: Status;
	rqst: Rqst;
	stops: Stop[];
};

export type Status = {
	code: number;
	msg: string;
};

export type Rqst = {
	method: string;
	params: Params;
};

export type Params = {};

export type Stop = {
	stop_id: string;
	stop_name: string;
	code: string;
	distance: number;
	stop_points: StopPoint[];
};

export type StopPoint = {
	code: string;
	stop_id: string;
	stop_lat: number;
	stop_lon: number;
	stop_name: string;
};
