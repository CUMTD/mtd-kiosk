import { atom, selector, selectorFamily } from 'recoil';
import { Advertisement } from '../sanity.types';
import IconMessageWithImages from '../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute, { GeneralMessage } from '../types/kioskDisplayTypes/GroupedRoute';

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

export const currentIconMessageSelector = selector<IconMessageWithImages>({
	key: 'currentIconMessageSelector',
	get: ({ get }) => {
		const iconMessages = get(allIconMessagesState);
		const currentIconMessageIndex = get(currentIconMessageIndexState);
		return iconMessages[currentIconMessageIndex];
	}
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
