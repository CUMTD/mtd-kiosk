import { HealthStatus } from './HealthStatus';

export type ServerHealthStatuses = {
	overallHealth: HealthStatus;
	healthStatuses: HealthStatuses;
	openTicketCount: number;
	kioskId: string;
};

export type HealthStatuses = {
	button: HealthStatus;
	led: HealthStatus;
	lcd: HealthStatus;
};
