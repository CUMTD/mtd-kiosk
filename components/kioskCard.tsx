'use client';
import { Inter } from 'next/font/google';
import IStopIcon from './iStopIcon';
import styles from './kioskCard.module.css';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import { useRecoilState, useRecoilValue } from 'recoil';
import { focusedKioskIdState } from '../state/mapState';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { HealthStatus } from '../types/HealthStatus';
import Link from 'next/link';
import getHealthStatuses from '../helpers/getHealthStatuses';
import { ServerHealthStatuses } from '../types/serverHealthStatuses';
import { KioskObject } from '../types/KioskObjects';
import KioskStatusBadge from './kioskStatusBadge';
import { showProblemsOnlyState } from '../state/kioskState';
import { GoChevronRight } from 'react-icons/go';

interface KioskCardProps {
	kiosk: Kiosk;
	index: number;
	clickable?: boolean;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kiosk: { slug, _id, displayName, iStop }, index, clickable }: KioskCardProps) {
	const KioskCardRef = useRef<HTMLDivElement>(null);
	const [focusedKiosk, setFocusedKiosk] = useRecoilState(focusedKioskIdState);

	// state for health status, to be passed into KioskStatusBadge as a prop
	const [healthStatus, setHealthStatus] = useState<ServerHealthStatuses>();

	const showProblemsOnly = useRecoilValue(showProblemsOnlyState);

	useEffect(() => {
		async function fetchHealthStatus() {
			const healthStatuses = await getHealthStatuses(_id);
			if (healthStatuses) setHealthStatus(healthStatuses);
		}
		fetchHealthStatus();
		setTimeout(() => fetchHealthStatus(), 10000);
	}, [_id]);

	useEffect(() => {
		if (focusedKiosk === _id && KioskCardRef.current) {
			KioskCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
			KioskCardRef.current.focus();
		}
	}, [focusedKiosk, _id]);

	const [kioskCardClasses, setKioskCardClasses] = useState<string>(styles.kioskCard);

	useEffect(() => {
		if (healthStatus) {
			setKioskCardClasses(
				clsx(styles.kioskCard, {
					[styles.healthy]: healthStatus.overallHealth === HealthStatus.HEALTHY,
					[styles.warning]: healthStatus.overallHealth === HealthStatus.WARNING,
					[styles.critical]: healthStatus.overallHealth === HealthStatus.CRITICAL,
					[styles.unknown]: healthStatus.overallHealth === HealthStatus.UNKNOWN
				})
			);
		}
	}, [healthStatus]);

	// const kioskCardClasses =
	// 	healthStatus &&
	// 	clsx(styles.kioskCard, {
	// 		[styles.healthy]: healthStatus.overallHealth === HealthStatus.HEALTHY,
	// 		[styles.warning]: healthStatus.overallHealth === HealthStatus.WARNING,
	// 		[styles.critical]: healthStatus.overallHealth === HealthStatus.CRITICAL,
	// 		[styles.unknown]: healthStatus.overallHealth === HealthStatus.UNKNOWN
	// 	});

	if (showProblemsOnly && healthStatus?.overallHealth === HealthStatus.HEALTHY) return null;

	const issuesButtonClasses = clsx({
		[inter.className]: true,
		[styles.button]: true,
		[styles.openTicketCount]: healthStatus && healthStatus.openTicketCount > 0
	});

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			className={kioskCardClasses}
			id={_id}
			ref={KioskCardRef}
			tabIndex={clickable ? index : undefined}
			onClick={() => clickable && setFocusedKiosk(_id)}
			role="button"
			onBlur={() => clickable && setFocusedKiosk(null)}
		>
			{
				<div className={styles.badges}>
					<KioskStatusBadge kioskObject={KioskObject.Button} status={healthStatus?.healthStatuses.button} />
					<KioskStatusBadge kioskObject={KioskObject.LED} status={healthStatus?.healthStatuses.led} />
					<KioskStatusBadge kioskObject={KioskObject.LCD} status={healthStatus?.healthStatuses.lcd} />
				</div>
			}

			<div className={styles.kioskName}>
				<h2>{displayName}</h2>
				{iStop && <IStopIcon />}
			</div>

			<div className={styles.buttonContainer}>
				<Link href={`https://kiosk.mtd.org/kiosks/${slug.current}/`} target="_blank" className={`${inter.className}  ${styles.button}`}>
					View
				</Link>

				<Link href={`/issues/${_id}`} className={issuesButtonClasses}>
					{healthStatus && healthStatus.openTicketCount > 0 ? (
						<>
							{healthStatus?.openTicketCount} open {healthStatus?.openTicketCount === 1 ? 'issue' : 'issues'} <GoChevronRight />
						</>
					) : (
						'Issue Tracker'
					)}
				</Link>

				{/* {healthStatus && healthStatus.openTicketCount > 0 && (
					<div className={styles.openTicketCount}>
						<span className={styles.openTicketCountText}></span>
					</div>
				)} */}
			</div>
		</div>
	);
}
