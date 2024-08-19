'use client';
import { useEffect, useState } from 'react';

export default function LiveClock() {
	const [time, setTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

	useEffect(() => {
		const timerId = setInterval(() => {
			// format HH:MM AM/PM
			setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
		}, 1000);

		// Cleanup interval on component unmount
		return () => {
			clearInterval(timerId);
		};
	}, []);

	// remove leading zero from hours
	return time.replace(/^0/, '');
}
