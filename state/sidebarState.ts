import { atom, selector, selectorFamily } from 'recoil';
import { Kiosk } from '../sanity.types';
import { HealthStatus } from '../types/HealthStatus';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';

export const showMapState = atom<boolean>({
	key: 'showMapState',
	default: true
});

export const focusedKioskIdState = atom<string | null>({
	key: 'focusedKioskIdState',
	default: null
});

export const allKiosksState = atom<Kiosk[]>({
	key: 'allKiosksState',
	default: []
});

export const kioskHealthStatusesState = atom<ServerHealthStatuses[]>({
	key: 'kioskHealthStatusesState',
	default: []
});

export const showProblemsOnlyState = atom<boolean>({
	key: 'showProblemsOnlyState',
	default: false
});

export const currentlyFilteredKiosksSelector = selector<Kiosk[]>({
	key: 'currentlyFilteredKiosksSelector',
	get: ({ get }) => {
		const kiosks = get(allKiosksState);
		const showProblemsOnly = get(showProblemsOnlyState);
		const healthStatuses = get(kioskHealthStatusesState);

		let returnKiosks = kiosks;

		if (showProblemsOnly) {
			returnKiosks = kiosks.filter((k) => {
				const health = healthStatuses.find((h) => h.kioskId === k._id);
				return health && health.overallHealth !== HealthStatus.HEALTHY;
			});
		}

		return [...returnKiosks].sort((a, b) => (a.displayName ?? '')?.localeCompare(b.displayName ?? ''));
	}
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

export const kioskSelectorFamily = selectorFamily<{ kiosk: Kiosk; health: ServerHealthStatuses }, string>({
	key: 'kioskSelectorFamily',
	get:
		(kioskId: string) =>
		({ get }) => {
			const kiosks = get(allKiosksState);
			const healthStatuses = get(kioskHealthStatusesState);

			const kiosk = kiosks.find(({ _id: id }) => id === kioskId);
			const health = healthStatuses.find(({ kioskId: healthKioskId }) => healthKioskId === kioskId);

			return {
				kiosk: kiosk!,
				health: health ?? { ...defaultKioskHealthStatus, kioskId }
			};
		}
});
