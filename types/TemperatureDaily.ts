export type TemperatureDaily = {
	date: number;
	minTempFahrenheit: number;
	maxTempFahrenheit: number;
	avgTempFahrenheit: number;
	minRelHumidity: number;
	maxRelHumidity: number;
	avgRelHumidity: number;
};

export type AllTemperatureDaily = {
	kioskId: string;
	date: string;
	minTempFahrenheit: number;
	maxTempFahrenheit: number;
	avgTempFahrenheit: number;
	minRelHumidity: number;
	maxRelHumidity: number;
	avgRelHumidity: number;
};
