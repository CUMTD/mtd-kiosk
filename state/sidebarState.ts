import { atom } from 'jotai';
import { Kiosk } from '../sanity.types';
import { HealthStatus } from '../types/HealthStatus';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';

export const showMapState = atom<boolean>(true);

export const focusedKioskIdState = atom<string | null>(null);

export const allKiosksState = atom<Kiosk[]>([]);

export const kioskHealthStatusesState = atom<ServerHealthStatuses[]>([]);

export const showProblemsOnlyState = atom<boolean>(false);

export const showDevelopmentKiosksState = atom<boolean>(false);

export const currentlyFilteredKiosksSelector = atom<Kiosk[]>((get) => {
	const kiosks = get(allKiosksState);
	const showProblemsOnly = get(showProblemsOnlyState);
	const showDevelopmentKiosks = get(showDevelopmentKiosksState);
	const healthStatuses = get(kioskHealthStatusesState);

	let returnKiosks = kiosks;

	if (showProblemsOnly) {
		returnKiosks = kiosks.filter((k) => {
			const health = healthStatuses.find((h) => h.kioskId === k._id);
			return health && health.overallHealth !== HealthStatus.HEALTHY;
		});
	}

	if (!showDevelopmentKiosks) {
		returnKiosks = returnKiosks.filter((k) => !k.displayName?.includes('development'));
	}

	return [...returnKiosks].sort((a, b) => (a.displayName ?? '')?.localeCompare(b.displayName ?? ''));
});

const defaultKioskHealthStatus: Omit<ServerHealthStatuses, 'kioskId'> = {
	overallHealth: HealthStatus.UNKNOWN,
	healthStatuses: {
		button: HealthStatus.UNKNOWN,
		led: HealthStatus.UNKNOWN,
		lcd: HealthStatus.UNKNOWN
	},
	openTicketCount: 0
};

export const kioskAtomFamily = (kioskId: string) =>
	atom<{ kiosk: Kiosk; health: ServerHealthStatuses }>((get) => {
		const kiosks = get(allKiosksState);
		const healthStatuses = get(kioskHealthStatusesState);

		const kiosk = kiosks.find(({ _id: id }) => id === kioskId);
		const health = healthStatuses.find(({ kioskId: healthKioskId }) => healthKioskId === kioskId);

		return {
			kiosk: kiosk!,
			health: health ?? { ...defaultKioskHealthStatus, kioskId }
		};
	});
