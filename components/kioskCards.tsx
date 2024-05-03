'use client';
import { useSetRecoilState } from 'recoil';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';
import { focusedKioskIdState } from '../state/mapState';
import { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import clsx from 'clsx';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';

interface KioskCardsProps {
	kiosks: Kiosk[];
	readonly?: boolean;
	// healthStatus?: ServerHealthStatuses | null;
}
export default function KioskCards({ kiosks, readonly }: KioskCardsProps) {
	const setFocusedKioskId = useSetRecoilState(focusedKioskIdState);

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapse = () => {
		setCollapsed(!collapsed);
	};

	const kioskCardsClasses = clsx({
		[styles.kioskCardsContainer]: true,
		[styles.collapsed]: collapsed
	});

	return (
		<>
			<button className={styles.collapseButton} onClick={toggleCollapse}>
				{collapsed ? <GoChevronLeft /> : <GoChevronRight />}
			</button>
			<main className={kioskCardsClasses}>
				{/* collapse button */}

				{!collapsed &&
					kiosks
						.sort((a, b) => a.displayName.localeCompare(b.displayName))
						.map((kiosk, idx) => <KioskCard key={kiosk._id} kiosk={kiosk} index={idx} clickable={!readonly} />)}
			</main>
		</>
	);
}
