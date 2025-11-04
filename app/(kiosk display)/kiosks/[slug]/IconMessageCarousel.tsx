import clsx from 'clsx';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import throwError from '../../../../helpers/throwError';
import {
	blockRealtimeSelector,
	currentIconMessageIndexState,
	currentPageDeparturesSelector,
	generalMessageState,
	iconMessagesSelector,
	showMapState
} from '../../../../state/kioskState';
import IconMessage from './IconMessage';
import styles from './IconMessageCarousel.module.css';
import PageIndicator from './pageIndicator';

const pageInterval = parseInt(process.env.NEXT_PUBLIC_ICON_MESSAGE_PAGINATION_INTERVAL ?? throwError('Missing NEXT_PUBLIC_ICON_MESSAGE_PAGINATION_INTERVAL'));

export default function IconMessageCarousel() {
	const iconMessages = useRecoilValue(iconMessagesSelector);
	const [currentIconMessageIndex, setCurrentIconMessageIndex] = useRecoilState(currentIconMessageIndexState);
	const currentDepartures = useRecoilValue(currentPageDeparturesSelector);
	const blockRealtime = useRecoilValue(blockRealtimeSelector);
	const showMap = useRecoilValue(showMapState);
	const generalMessage = useRecoilValue(generalMessageState);

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

	const iconMessageCarouselClasses = clsx('icon-message-carousel', styles.iconMessageCarousel, {
		[styles.doubleRow]: !showMap
	});

	return (
		<>
			<div className={iconMessageCarouselClasses}>
				{iconMessages.map(({ _id: id }, index) => (
					<IconMessage key={id} index={index} />
				))}
				{!generalMessage?.blockRealtime && <PageIndicator />}
			</div>
		</>
	);
}
