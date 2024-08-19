'use client';
import { useEffect, useMemo, useState } from 'react';

export default function LiveClock() {
	const [time, setTime] = useState<Date>(new Date());
	const timeString = useMemo(() => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), [time]).replace(/^0/, '');

	// sync time with server every 10 minutes
	useEffect(() => {
		async function fetchTime() {
			const response = await fetch('API ENDPOINT');
			const data = await response.json();
			// TODO: parse time string to date
			const date = new Date(data.time);
			setTime(date);
		}

		const timerId = setInterval(() => {
			fetchTime();
		}, 600_000); // 10 minutes

		return () => {
			clearInterval(timerId);
		};
	}, []);

	// Tick Every 1 second
	useEffect(() => {
		const TICK = 1_000;

		const timerId = setInterval(() => {
			const newDate = new Date(time.getTime() + TICK);
			setTime(newDate);
		}, TICK);

		return () => {
			clearInterval(timerId);
		};
	}, [time]);

	// remove leading zero from hours
	return <>{timeString}</>;
}
