'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import { currentlyFilteredKiosksSelector, showProblemsOnlyState } from '../state/sidebarState';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';

interface KioskCardsProps {
	readonly?: boolean;
}
export default function KioskCards({ readonly }: KioskCardsProps) {
	const [showProblemsOnly, setShowProblemsOnly] = useRecoilState(showProblemsOnlyState);
	const currentlyFilteredKiosks = useRecoilValue(currentlyFilteredKiosksSelector);

	const toggleShowProblemsOnly = () => {
		setShowProblemsOnly(!showProblemsOnly);
	};

	return (
		<aside className={styles.kioskCardsContainer}>
			<label className={styles.showProblemsOnly}>
				<input type="checkbox" onClick={toggleShowProblemsOnly} value={`${showProblemsOnly}`} />
				Show Problems Only
			</label>
			{currentlyFilteredKiosks.length > 0 &&
				currentlyFilteredKiosks.map(({ _id: id }, idx) => <KioskCard key={id} kioskId={id} index={idx} clickable={!readonly} />)}
		</aside>
	);
}
