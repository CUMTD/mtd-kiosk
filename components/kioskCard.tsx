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
import getHealthStatuses from '../helpers/httpMethods';
import { HealthStatuses, ServerHealthStatuses } from '../types/serverHealthStatuses';
import { KioskObject } from '../types/KioskObjects';
import KioskStatusBadge from './kioskStatusBadge';
import { showProblemsOnlyState } from '../state/kioskState';
import { GoChevronRight } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import HasLedSignIcon from './hasLedSignIcon';

interface KioskCardProps {
	kiosk: Kiosk;
	index: number;
	health: ServerHealthStatuses | undefined;
	clickable?: boolean;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kiosk: { slug, _id, displayName, iStop, hasLed }, index, clickable, health }: KioskCardProps) {
	const router = useRouter();

	const KioskCardRef = useRef<HTMLDivElement>(null);
	const [focusedKiosk, setFocusedKiosk] = useRecoilState(focusedKioskIdState);

	// state for health status, to be passed into KioskStatusBadge as a prop
	// const [healthStatus, setHealthStatus] = useState<ServerHealthStatuses | null>();

	const showProblemsOnly = useRecoilValue(showProblemsOnlyState);

	// useEffect(() => {
	// 	async function fetchHealthStatus() {
	// 		const healthStatuses = await getHealthStatuses(_id);
	// 		if (healthStatuses) setHealthStatus(healthStatuses);
	// 	}
	// 	fetchHealthStatus();
	// 	setTimeout(() => fetchHealthStatus(), 10000);
	// }, [_id]);

	useEffect(() => {
		if (focusedKiosk === _id && KioskCardRef.current) {
			// KioskCardRef.current.scrollIntoView({ block: 'center' });
			KioskCardRef.current.focus();
		}
	}, [focusedKiosk, _id]);

	const [kioskCardClasses, setKioskCardClasses] = useState<string>(styles.kioskCard);

	useEffect(() => {
		if (health) {
			setKioskCardClasses(
				clsx(styles.kioskCard, {
					[styles.healthy]: health.overallHealth === HealthStatus.HEALTHY,
					[styles.warning]: health.overallHealth === HealthStatus.WARNING,
					[styles.critical]: health.overallHealth === HealthStatus.CRITICAL,
					[styles.unknown]: health.overallHealth === HealthStatus.UNKNOWN
				})
			);
		}
	}, [health]);

	// const kioskCardClasses =
	// 	healthStatus &&
	// 	clsx(styles.kioskCard, {
	// 		[styles.healthy]: healthStatus.overallHealth === HealthStatus.HEALTHY,
	// 		[styles.warning]: healthStatus.overallHealth === HealthStatus.WARNING,
	// 		[styles.critical]: healthStatus.overallHealth === HealthStatus.CRITICAL,
	// 		[styles.unknown]: healthStatus.overallHealth === HealthStatus.UNKNOWN
	// 	});

	if (showProblemsOnly && health?.overallHealth === HealthStatus.HEALTHY) return null;

	const issuesButtonClasses = clsx({
		[inter.className]: true,
		[styles.button]: true,
		[styles.openTicketCount]: health && health.openTicketCount > 0
	});

	const handleIssuesButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		router.push(`/issues/${_id}`);
	};

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
			<div className={styles.kioskCardContainer}>
				<div className={styles.kioskName}>
					<h2>{displayName}</h2>
					{iStop && <IStopIcon />}
					{hasLed && <HasLedSignIcon />}
				</div>

				<div className={styles.buttonContainer}>
					<Link href={`/kiosks/${slug.current}/`} target="_blank" className={`${inter.className}  ${styles.button}`}>
						Preview Departures
					</Link>

					<Link href={`/issues/${_id}`} className={issuesButtonClasses} onClick={handleIssuesButtonClick}>
						{health && health.openTicketCount > 0 ? (
							<>
								{health?.openTicketCount} open {health?.openTicketCount === 1 ? 'issue' : 'issues'} <GoChevronRight />
							</>
						) : (
							'Details'
						)}
					</Link>

					{/* {healthStatus && healthStatus.openTicketCount > 0 && (
					<div className={styles.openTicketCount}>
						<span className={styles.openTicketCountText}></span>
					</div>
				)} */}
				</div>
			</div>
			{
				<div className={styles.badges}>
					<KioskStatusBadge kioskObject={KioskObject.Button} status={health?.healthStatuses.button} align="right" />
					{hasLed && <KioskStatusBadge kioskObject={KioskObject.LED} status={health?.healthStatuses.led} align="right" />}
					<KioskStatusBadge kioskObject={KioskObject.LCD} status={health?.healthStatuses.lcd} align="right" />
				</div>
			}
		</div>
	);
}
