import clsx from 'clsx';
import { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import throwError from '../../../../helpers/throwError';
import {
	blockRealtimeSelector,
	currentIconMessageIndexState,
	currentPageDeparturesSelector,
	iconMessagesSelector,
	showPagerSelector
} from '../../../../state/kioskState';
import IconMessage from './IconMessage';
import styles from './IconMessageCarousel.module.css';

const pageInterval = parseInt(process.env.NEXT_PUBLIC_ICON_MESSAGE_PAGINATION_INTERVAL ?? throwError('Missing NEXT_PUBLIC_ICON_MESSAGE_PAGINATION_INTERVAL'));

export default function IconMessageCarousel() {
	const iconMessages = useAtomValue(iconMessagesSelector);
	const [currentIconMessageIndex, setCurrentIconMessageIndex] = useAtom(currentIconMessageIndexState);
	const currentDepartures = useAtomValue(currentPageDeparturesSelector);
	const blockRealtime = useAtomValue(blockRealtimeSelector);
	const pageIndicatorVisible = useAtomValue(showPagerSelector);

	// cycle through icon messages on a timer
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIconMessageIndex(currentIconMessageIndex + 1 >= iconMessages.length ? 0 : currentIconMessageIndex + 1);
		}, pageInterval);

		return () => clearInterval(interval);
	}, [setCurrentIconMessageIndex, currentIconMessageIndex, iconMessages?.length]);

	if (blockRealtime || currentDepartures.length === 0 || iconMessages.length === 0) {
		return null;
	}

	const iconMessageCarouselClasses = clsx('icon-message-carousel', styles.iconMessageCarousel, { [styles.pager]: pageIndicatorVisible });

	return (
		<div className={iconMessageCarouselClasses}>
			{iconMessages.map(({ _id: id }, index) => (
				<IconMessage key={id} index={index} />
			))}
		</div>
	);
}
