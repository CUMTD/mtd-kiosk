import { atom } from 'recoil';

export const showMapState = atom<boolean>({
	key: 'showMapState',
	default: true
});

export const focusedKioskIdState = atom<string | null>({
	key: 'focusedKioskIdState',
	default: null
});
