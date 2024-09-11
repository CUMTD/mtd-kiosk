'use client';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

interface KioskCardProps {
	kioskId: string;
	index: number;
	clickable?: boolean;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kioskId, index, clickable }: KioskCardProps) {
	const router = useRouter();

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
					<Link href={`/issues/${id}`} className={issuesButtonClasses}>
						{openTicketCount > 0 ? (
							<>
								{openTicketCount} open {openTicketCount === 1 ? 'issue' : 'issues'} <GoChevronRight />
							</>
						) : (
							'Details'
						)}
					</Link>
					{slug?.current && (
						<Link href={`/kiosks/${slug.current}/`} target="_blank" className={`${inter.className}  ${styles.button}`}>
							Launch
						</Link>
					)}
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
