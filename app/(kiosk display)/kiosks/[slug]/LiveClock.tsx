'use client';

import { useEffect, useState } from 'react';
import styles from './liveClock.module.css';

export default function LiveClock() {
	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			// format HH:MM AM/PM
			setTime(new Date());
		}, 1000);

		// cleanup
		return () => {
			clearInterval(timerId);
		};
	}, []);

	//format time and remove leading zero from hours
	const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0/, '');

	return (
		<time dateTime={time.toISOString()} className={styles.time}>
			{timeString}
		</time>
	);
}
