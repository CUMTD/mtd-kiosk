'use client';

import { useEffect, useState } from 'react';
import throwError from '../helpers/throwError';

const darkModeMapId = process.env.NEXT_PUBLIC_DARK_MODE_MAP_ID ?? throwError('NEXT_PUBLIC_DARK_MODE_MAP_ID not set');
const lightModeMapId = process.env.NEXT_PUBLIC_LIGHT_MODE_MAP_ID ?? throwError('NEXT_PUBLIC_LIGHT_MODE_MAP_ID not set');

export default function useMapId(): string | null {
	// Initialize mapId to null or a default value
	const [mapId, setMapId] = useState<string | null>(null);

	useEffect(() => {
		// Ensure this runs only on the client (browser)
		if (typeof window !== 'undefined') {
			// Get initial preference based on user's color scheme
			const initialMapId = getMapColorPreference(window);
			setMapId(initialMapId);

			// Set up a media query listener for color scheme changes
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			const handleChange = () => {
				setMapId(mediaQuery.matches ? darkModeMapId : lightModeMapId);
			};

			mediaQuery.addEventListener('change', handleChange);

			// Clean up the event listener on unmount
			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	}, []);

	return mapId;
}

function getMapColorPreference(window: Window) {
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	return prefersDarkScheme.matches ? darkModeMapId : lightModeMapId;
}
