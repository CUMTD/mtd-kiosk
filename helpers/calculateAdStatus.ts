import { Advertisement } from '../sanity.types';

export function calculateAdStatus(advertisement: Advertisement): number {
	if (!advertisement.startDate) {
		return 0;
	}

	const newStartDate = new Date(advertisement.startDate);
	if (Number.isNaN(newStartDate.getTime())) {
		return 0;
	}

	const now = new Date();

	if (newStartDate > now) {
		return 1;
	}

	if (!advertisement.endDate) {
		return 0;
	}

	const newEndDate = new Date(advertisement.endDate);
	if (Number.isNaN(newEndDate.getTime())) {
		return 0;
	}

	if (newEndDate < now) {
		return 2;
	}

	return 0;
}
