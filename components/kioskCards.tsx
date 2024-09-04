'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import { HealthStatus } from '../types/HealthStatus';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import KioskCard from './kioskCard';
import styles from './kioskCards.module.css';

interface KioskCardsProps {
	kiosks: Kiosk[];
	readonly?: boolean;
	healthStatuses: ServerHealthStatuses[] | null;
}
export default function KioskCards({ kiosks, readonly, healthStatuses }: KioskCardsProps) {
	const [currentKiosks, setCurrentKiosks] = useState<Kiosk[]>(kiosks);
	const [showProblemsOnly, setShowProblemsOnly] = useState(false);

	const toggleShowProblemsOnly = () => {
		setShowProblemsOnly(!showProblemsOnly);
	};

	useEffect(() => {
		if (showProblemsOnly && healthStatuses) {
			var filteredKiosks = kiosks.filter((k) => {
				const health = healthStatuses.find((h) => h.kioskId === k._id);
				return health && health.overallHealth !== HealthStatus.HEALTHY;
			});
			setCurrentKiosks(filteredKiosks);
		} else setCurrentKiosks(kiosks);
	}, [showProblemsOnly, healthStatuses, kiosks]);

	const kioskCardsClasses = clsx({
		[styles.kioskCardsContainer]: true
	});

	return (
		<main className={kioskCardsClasses}>
			<label className={styles.showProblemsOnly}>
				<input type="checkbox" onClick={toggleShowProblemsOnly} value={`${showProblemsOnly}`} />
				Show Problems Only
			</label>
			{currentKiosks.length > 0 &&
				currentKiosks
					.sort((a, b) => a.displayName.localeCompare(b.displayName))
					.map((kiosk, idx) => (
						<KioskCard
							health={healthStatuses && healthStatuses.length > 0 ? healthStatuses.find((k) => k.kioskId === kiosk._id) : undefined}
							// a more elegant way:
							key={kiosk._id}
							kiosk={kiosk}
							index={idx}
							clickable={!readonly}
						/>
					))}
		</main>
	);
}
