import { atom } from 'jotai';
import { AdsWithImageUrl } from '../helpers/httpMethods';
import { Kiosk } from '../sanity.types';
import IconMessageWithImages from '../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute, { GeneralMessage } from '../types/kioskDisplayTypes/GroupedRoute';

export const kioskState = atom<Kiosk>({ _id: '', _type: 'kiosk', _createdAt: '', _updatedAt: '', _rev: '' });

export const advertisementsState = atom<AdsWithImageUrl[]>([]);

export const departureState = atom<GroupedRoute[]>([]);

export const generalMessageState = atom<GeneralMessage | null>(null);

export const departuresPerPageSelector = atom<number>((get) => {
	const DEPARTURES_PER_PAGE = 8;

	const generalMessage = get(generalMessageState);
	if (generalMessage) {
		if (generalMessage.blockRealtime) {
			return 0;
		}
		return DEPARTURES_PER_PAGE - 1;
	}
	return DEPARTURES_PER_PAGE;
});

export const blockRealtimeSelector = atom<boolean>((get) => {
	const generalMessage = get(generalMessageState);
	return generalMessage?.blockRealtime ?? false;
});

export const connectionErrorState = atom<boolean>(false);

export const darkModeState = atom<boolean>(false);

export const allIconMessagesState = atom<IconMessageWithImages[]>([]);

// filters out acrossStreetOnly icon messages if there are no departures across the street
export const iconMessagesSelector = atom<IconMessageWithImages[]>((get) => {
	const iconMessages = get(allIconMessagesState);
	const departures = get(departureState);

	const hasAcrossStreet = departures.some((departure) => departure.isAcrossStreet);

	if (iconMessages && !hasAcrossStreet) {
		return iconMessages.filter((iconMessage) => !iconMessage.acrossStreetOnly);
	}

	return iconMessages;
});

export const currentIconMessageIndexState = atom<number>(0);

export const iconMessageAtomFamily = (index: number) =>
	atom<IconMessageWithImages>((get) => {
		const iconMessages = get(allIconMessagesState);
		return iconMessages[index];
	});

export const currentPageState = atom<number>(0);

export const showPagerSelector = atom<boolean>((get) => {
	const blockRealtime = get(blockRealtimeSelector);
	const totalPages = get(totalPagesSelector);
	return totalPages > 1 && !blockRealtime;
});

export const totalPagesSelector = atom<number>((get) => {
	const departures = get(departureState);
	const departuresPerPage = get(departuresPerPageSelector);
	return Math.ceil(departures.length / departuresPerPage);
});

export const currentPageDeparturesSelector = atom<GroupedRoute[]>((get) => {
	const departures = get(departureState);
	const page = get(currentPageState);
	const departuresPerPage = get(departuresPerPageSelector);

	// just in case
	if (departures.length <= departuresPerPage) {
		return departures;
	}

	return departures.slice(page * departuresPerPage, (page + 1) * departuresPerPage);
});
