import { HealthStatus } from './HealthStatus';

export interface ServerHealthStatuses {
	overallHealth: HealthStatus;
	healthStatuses: HealthStatuses;
	openTicketCount: number;
}

export interface HealthStatuses {
	button: HealthStatus;
	led: HealthStatus;
	lcd: HealthStatus;
}
