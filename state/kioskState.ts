import { atom, selector, selectorFamily } from 'recoil';
import { Advertisement, Kiosk } from '../sanity.types';
import IconMessageWithImages from '../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute, { GeneralMessage } from '../types/kioskDisplayTypes/GroupedRoute';

export const departuresPerPageSelector = selector<number>({
	key: 'departuresPerPageSelector',
	get: ({ get }) => {
		const DEPARTURES_PER_PAGE = 7;

		const generalMessage = get(generalMessageState);
		if (generalMessage) {
			if (generalMessage.blockRealtime) {
				return 0;
			}
			return DEPARTURES_PER_PAGE - 1;
		}
		return DEPARTURES_PER_PAGE;
	}
});

export const kioskState = atom<Kiosk>({
	key: 'loadedKioskState',
	default: {
		_id: '',
		_type: 'kiosk',
		_createdAt: '',
		_updatedAt: '',
		_rev: ''
	}
});

export const advertisementsState = atom<Advertisement[]>({
	key: 'advertisementsState',
	default: []
});

export const departureState = atom<GroupedRoute[]>({
	key: 'departureState',
	default: []
});

export const generalMessageState = atom<GeneralMessage | null>({
	key: 'generalMessageState',
	default: null
});

export const blockRealtimeSelector = selector<boolean>({
	key: 'blockRealtimeSelector',
	get: ({ get }) => {
		const generalMessage = get(generalMessageState);
		return generalMessage?.blockRealtime ?? false;
	}
});

export const connectionErrorState = atom<boolean>({
	key: 'errorState',
	default: false
});

export const darkModeState = atom<boolean>({
	key: 'darkModeState',
	default: false
});

export const allIconMessagesState = atom<IconMessageWithImages[]>({
	key: 'allIconMessagesState',
	default: []
});

// filters out acrossStreetOnly icon messages if there are no departures across the street
export const iconMessagesSelector = selector<IconMessageWithImages[]>({
	key: 'iconMessagesSelector',
	get: ({ get }) => {
		const iconMessages = get(allIconMessagesState);
		const departures = get(departureState);

		const hasAcrossStreet = departures.some((departure) => departure.isAcrossStreet);

		if (!hasAcrossStreet) {
			return iconMessages.filter((iconMessage) => !iconMessage.acrossStreetOnly);
		}

		return iconMessages;
	}
});

export const currentIconMessageIndexState = atom<number>({
	key: 'currentIconMessageIndexState',
	default: 0
});

export const iconMessageSelectorFamily = selectorFamily<IconMessageWithImages, number>({
	key: 'iconMessageSelectorFamily',
	get:
		(index) =>
		({ get }) => {
			const iconMessages = get(allIconMessagesState);
			return iconMessages[index];
		}
});

export const currentPageState = atom<number>({
	key: 'currentPageState',
	default: 0
});

export const showPagerSelector = selector<boolean>({
	key: 'showPagerSelector',
	get: ({ get }) => {
		const departures = get(departureState);
		const blockRealtime = get(blockRealtimeSelector);
		const departuresPerPage = get(departuresPerPageSelector);
		return departures.length > departuresPerPage && !blockRealtime;
	}
});

export const totalPagesSelector = selector<number>({
	key: 'totalPagesSelector',
	get: ({ get }) => {
		const departures = get(departureState);
		const departuresPerPage = get(departuresPerPageSelector);
		return Math.ceil(departures.length / departuresPerPage);
	}
});

export const currentPageDeparturesSelector = selector<GroupedRoute[]>({
	key: 'currentPageDeparturesSelector',
	get: ({ get }) => {
		const departures = get(departureState);
		const page = get(currentPageState);
		const departuresPerPage = get(departuresPerPageSelector);
		return departures.slice(page * departuresPerPage, (page + 1) * departuresPerPage);
	}
});
