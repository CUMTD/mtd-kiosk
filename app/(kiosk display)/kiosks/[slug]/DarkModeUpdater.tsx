import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { darkModeState } from '../../../../state/kioskState';
import { getDarkModeStatus } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';

const DARK_MODE_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_DARK_MODE_FETCH_INTERVAL ?? '');

if (!DARK_MODE_FETCH_INTERVAL || isNaN(DARK_MODE_FETCH_INTERVAL)) {
	throwError('NEXT_PUBLIC_DARK_MODE_FETCH_INTERVAL is not defined');
}

export default function DarkModeUpdater() {
	const setDarkMode = useSetRecoilState(darkModeState);

	useEffect(() => {
		async function updateDarkMode() {
			const darkMode = await getDarkModeStatus();
			setDarkMode(darkMode);
		}
		updateDarkMode();
		const timer = setInterval(updateDarkMode, DARK_MODE_FETCH_INTERVAL);
		return () => clearInterval(timer);
	}, [setDarkMode]);

	return null;
}
