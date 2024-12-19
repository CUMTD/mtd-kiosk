'use client';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { useRecoilState, useRecoilValue } from 'recoil';
import { focusedKioskIdState, kioskSelectorFamily } from '../state/sidebarState';
import { HealthStatus } from '../types/HealthStatus';
import { KioskObject } from '../types/KioskObjects';
import IStopIcon from './iStopIcon';
import styles from './kioskCard.module.css';
import KioskStatusBadge from './kioskStatusBadge';
import LedSignIcon from './ledSignIcon';
import { FaCircleExclamation, FaMagnifyingGlass } from 'react-icons/fa6';
import { LuExternalLink } from 'react-icons/lu';

interface KioskCardProps {
	kioskId: string;
	index: number;
	clickable?: boolean;
	focused?: boolean;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kioskId, index, clickable, focused }: KioskCardProps) {
	const kioskCardRef = useRef<HTMLDivElement>(null);
	const [focusedKiosk, setFocusedKiosk] = useRecoilState(focusedKioskIdState);

	const {
		kiosk: { _id: id, displayName, iStop, hasLed, slug },
		health: {
			overallHealth,
			openTicketCount,
			healthStatuses: { button, lcd, led }
		}
	} = useRecoilValue(kioskSelectorFamily(kioskId));

	useEffect(() => {
		if (focusedKiosk === id && kioskCardRef.current) {
			kioskCardRef.current.focus();
		}
	}, [focusedKiosk, id]);

	// if focused is true, focus the kiosk card
	useEffect(() => {
		if (focused && kioskCardRef.current) {
			kioskCardRef.current.focus();
		}
	}, [focused]);

	const kioskCardClasses = useMemo(() => {
		return clsx(styles.kioskCard, {
			[styles.healthy]: overallHealth === HealthStatus.HEALTHY,
			[styles.warning]: overallHealth === HealthStatus.WARNING,
			[styles.critical]: overallHealth === HealthStatus.CRITICAL,
			[styles.unknown]: overallHealth === HealthStatus.UNKNOWN
		});
	}, [overallHealth]);

	const issuesButtonClasses = clsx({
		[inter.className]: true,
		[styles.button]: true,
		[styles.openTicketCount]: openTicketCount > 0
	});

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			className={kioskCardClasses}
			id={id}
			ref={kioskCardRef}
			tabIndex={clickable ? index : undefined}
			onClick={() => clickable && setFocusedKiosk(id)}
			role="button"
			onBlur={() => clickable && setFocusedKiosk(null)}
		>
			<div className={styles.kioskCardContainer}>
				<div className={styles.kioskName}>
					<h2>{displayName}</h2>
					{iStop && <IStopIcon />}
					{hasLed && <LedSignIcon />}
				</div>

				<div className={styles.buttonContainer}>
					<Link href={`/dashboard/issues/${id}`} className={issuesButtonClasses}>
						{openTicketCount > 0 ? (
							<>
								<FaCircleExclamation />
								&nbsp;{openTicketCount} open {openTicketCount === 1 ? 'issue' : 'issues'} <GoChevronRight />
							</>
						) : (
							<>
								<FaMagnifyingGlass />
								&nbsp;Details
							</>
						)}
					</Link>
					{slug?.current && <LaunchKioskButton slug={slug.current} />}
				</div>
			</div>
			{
				<div className={styles.badges}>
					<KioskStatusBadge kioskObject={KioskObject.Button} status={button} align="right" />
					{hasLed && <KioskStatusBadge kioskObject={KioskObject.LED} status={led} align="right" />}
					<KioskStatusBadge kioskObject={KioskObject.LCD} status={lcd} align="right" />
				</div>
			}
		</div>
	);
}

interface LaunchKioskButtonProps {
	slug: string;
}

export function LaunchKioskButton({ slug }: LaunchKioskButtonProps) {
	return (
		<Link href={`/kiosks/${slug}/`} target="_blank" className={styles.button}>
			<LuExternalLink />
			&nbsp;Launch
		</Link>
	);
}
