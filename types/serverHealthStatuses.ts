import { HealthStatus } from './HealthStatus';

export interface ServerHealthStatuses {
	overallHealth: HealthStatus;
	healthStatuses: HealthStatuses;
	openTicketCount: number;
	kioskId: string; // todo add this to backend
}

export interface HealthStatuses {
	button: HealthStatus;
	led: HealthStatus;
	lcd: HealthStatus;
}
