import { atom } from 'recoil';

export const showProblemsOnlyState = atom<boolean>({
	key: 'showProblemsOnlyState',
	default: false
});
