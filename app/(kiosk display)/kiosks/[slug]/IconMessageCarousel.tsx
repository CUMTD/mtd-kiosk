import { useRecoilState, useRecoilValue } from 'recoil';
import { allIconMessagesState, currentIconMessageIndexState, darkModeState, iconMessagesSelector } from '../../../../state/kioskState';
import styles from './IconMessageCarousel.module.css';
import { useEffect } from 'react';
import IconMessage from './IconMessage';

export default function IconMessageCarousel() {
	const iconMessages = useRecoilValue(iconMessagesSelector);
	const [currentIconMessageIndex, setCurrentIconMessageIndex] = useRecoilState(currentIconMessageIndexState);

	// cycle through icon messages on a timer
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIconMessageIndex(currentIconMessageIndex + 1 >= iconMessages.length ? 0 : currentIconMessageIndex + 1);
		}, 15_000);

		return () => clearInterval(interval);
	}, [setCurrentIconMessageIndex, currentIconMessageIndex, iconMessages.length]);

	return (
		<div className={styles.iconMessageCarousel}>
			{iconMessages.map(({ _id }, index) => (
				<IconMessage key={_id} index={index} />
			))}
		</div>
	);
}
