import { atom } from 'recoil';
import { RealTimeBusPosition } from '../types/realtimeBusPosition';

export const busPositionsState = atom<RealTimeBusPosition[] | null>({
	key: 'busPositionsState',
	default: null
});
