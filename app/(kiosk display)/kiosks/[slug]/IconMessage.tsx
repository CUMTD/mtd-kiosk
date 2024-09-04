'use client';

import { useRecoilValue } from 'recoil';
import { currentIconMessageIndexState, darkModeState, iconMessageSelectorFamily } from '../../../../state/kioskState';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './IconMessage.module.css';

interface Props {
	index: number;
}

export default function IconMessage({ index }: Props) {
	const { darkModeImageUrl, lightModeImageUrl, message } = useRecoilValue(iconMessageSelectorFamily(index));
	const currentIconMessageIndex = useRecoilValue(currentIconMessageIndexState);
	const isCurrent = index === currentIconMessageIndex;
	const darkMode = useRecoilValue(darkModeState);

	const className = clsx({
		[styles.iconMessage]: true,
		[styles.current]: isCurrent
	});

	return (
		<div className={className}>
			<Image src={darkMode ? darkModeImageUrl : lightModeImageUrl} alt="" width={30} height={30} />
			{message}
		</div>
	);
}
