import { atom } from 'recoil';

export const showMapState = atom<boolean>({
	key: 'showMapState',
	default: false
});

export const focusedKioskIdState = atom<string | null>({
	key: 'focusedKioskIdState',
	default: null
});
