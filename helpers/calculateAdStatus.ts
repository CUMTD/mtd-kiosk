import { Advertisement } from '../sanity.types';

export function calculateAdStatus(advertisement: Advertisement): number {
	if (!advertisement.startDate || !advertisement.endDate) {
		return 0;
	}
	const newStartDate = new Date(advertisement.startDate ?? '');
	const newEndDate = new Date(advertisement.endDate ?? '');
	const now = new Date();

	if (newStartDate > now) {
		return 1;
	} else if (newEndDate < now) {
		return 2;
	} else {
		return 0;
	}
}
