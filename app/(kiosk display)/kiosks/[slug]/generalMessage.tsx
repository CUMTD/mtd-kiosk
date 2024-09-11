import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { generalMessageState } from '../../../../state/kioskState';
import styles from './KioskDepartures.module.css';

export default function GeneralMessage() {
	const scrollText = useRef<HTMLSpanElement>(null);
	const scrollContainer = useRef<HTMLDivElement>(null);

	const generalMessage = useRecoilValue(generalMessageState);

	const scrollAnimationDurationSeconds = useMemo(() => {
		if (!(generalMessage && generalMessage.text && scrollText.current && scrollContainer.current)) {
			return '0s';
		}

		const { text } = generalMessage;

		const speed = 90;
		//amount of pixels per second * (width of message + container width)
		const messageWidth = text.length * 10;
		const containerWidth = scrollContainer.current?.offsetWidth || 0;
		const totalWidth = messageWidth + containerWidth;

		const duration = totalWidth / speed;
		return `${duration}s`;
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
