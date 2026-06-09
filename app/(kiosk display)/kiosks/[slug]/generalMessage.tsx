import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { generalMessageState } from '../../../../state/kioskState';
import styles from './KioskDepartures.module.css';

export default function GeneralMessage() {
	const scrollText = useRef<HTMLSpanElement>(null);
	const scrollContainer = useRef<HTMLDivElement>(null);

	const generalMessage = useAtomValue(generalMessageState);
	const [scrollAnimationDurationSeconds, setScrollAnimationDurationSeconds] = useState('0s');

	useEffect(() => {
		if (!(generalMessage && generalMessage.text && scrollText.current && scrollContainer.current)) {
			setScrollAnimationDurationSeconds('0s');
			return;
		}

		const { text } = generalMessage;

		const speed = 90;
		//amount of pixels per second * (width of message + container width)
		const messageWidth = text.length * 10;
		const containerWidth = scrollContainer.current?.offsetWidth || 0;
		const totalWidth = messageWidth + containerWidth;

		const duration = totalWidth / speed;
		setScrollAnimationDurationSeconds(`${duration}s`);
	}, [generalMessage]);

	useEffect(() => {
		if (scrollText.current && scrollContainer.current) {
			scrollText.current.style.animationDuration = scrollAnimationDurationSeconds;
		}
	}, [scrollAnimationDurationSeconds]);

	if (!generalMessage) {
		return null;
	}

	if (generalMessage.blockRealtime) {
		return <div className={styles.realtimeBlockingGeneralMessage}>{generalMessage.text}</div>;
	}

	return (
		<div ref={scrollContainer} className={styles.generalMessage}>
			<span ref={scrollText} style={{ animationDuration: scrollAnimationDurationSeconds }}>
				{generalMessage.text}
			</span>
		</div>
	);
}
