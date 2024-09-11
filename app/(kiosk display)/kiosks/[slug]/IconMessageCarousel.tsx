import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { blockRealtimeSelector, currentIconMessageIndexState, currentPageDeparturesSelector, iconMessagesSelector } from '../../../../state/kioskState';
import IconMessage from './IconMessage';
import styles from './IconMessageCarousel.module.css';

export default function IconMessageCarousel() {
	const iconMessages = useRecoilValue(iconMessagesSelector);
	const [currentIconMessageIndex, setCurrentIconMessageIndex] = useRecoilState(currentIconMessageIndexState);
	const currentDepartures = useRecoilValue(currentPageDeparturesSelector);
	const blockRealtime = useRecoilValue(blockRealtimeSelector);

	// cycle through icon messages on a timer
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIconMessageIndex(currentIconMessageIndex + 1 >= iconMessages.length ? 0 : currentIconMessageIndex + 1);
		}, 15_000);

		return () => clearInterval(interval);
	}, [setCurrentIconMessageIndex, currentIconMessageIndex, iconMessages.length]);

	if (blockRealtime || currentDepartures.length === 0) {
		return null;
	}

	return (
		<div className={styles.iconMessageCarousel}>
			{iconMessages.map(({ _id: id }, index) => (
				<IconMessage key={id} index={index} />
			))}
		</div>
	);
}
