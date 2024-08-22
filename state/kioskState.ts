import { atom } from 'recoil';
import GroupedRoute, { GeneralMessage } from '../types/kioskDisplayTypes/GroupedRoute';

export const showProblemsOnlyState = atom<boolean>({
	key: 'showProblemsOnlyState',
	default: false
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
