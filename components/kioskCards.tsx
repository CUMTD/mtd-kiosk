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

	const handleOpenAllKiosks = () => {
		const openAll = window.confirm('Are you sure you want to open all kiosks?');
		if (openAll) {
			for (const kiosk of currentlyFilteredKiosks) {
				window.open(`/kiosks/${kiosk?.slug?.current}`, '_blank');
			}
		}
	};

	return (
		<aside className={styles.kioskCardsContainer}>
			<div className={styles.kioskCardsHeader}>
				<label className={styles.showProblemsOnly}>
					<input type="checkbox" onClick={toggleShowProblemsOnly} value={`${showProblemsOnly}`} />
					Show Problems Only
				</label>

				<button className={styles.openAllKiosks} onClick={handleOpenAllKiosks}>
					Open all kiosks
				</button>
			</div>
			{currentlyFilteredKiosks.length > 0 &&
				currentlyFilteredKiosks.map(({ _id: id }, idx) => <KioskCard key={id} kioskId={id} index={idx} clickable={!readonly} />)}
		</aside>
	);
}
