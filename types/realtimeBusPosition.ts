export type RealTimeBusPosition = {
	id: string | null | undefined;
	latitude: number;
	longitude: number;
	bearing: number | null | undefined;
	speed: number | null | undefined;
	trip: string | null | undefined;
	routeId: string | null | undefined;
	occupancyStatus: number | null | undefined;
	currentStopId: string | null | undefined;
};
