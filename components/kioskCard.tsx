import { Inter } from 'next/font/google';
import IStopIcon from './iStopIcon';
import styles from './kioskCard.module.css';
import { Kiosk } from '../sanity/schemas/documents/kiosk';
import { useRecoilState } from 'recoil';
import { focusedKioskIdState } from '../state/mapState';
import clsx from 'clsx';
import { Suspense, useEffect, useRef, useState } from 'react';
import { KioskObject } from '../types/KioskObjects';
import { HealthStatus } from '../types/HealthStatus';
import KioskStatusBadge from './kioskStatusBadge';
import getStatus from '../helpers/getHealthStatus';
import Link from 'next/link';

interface KioskCardProps {
	kiosk: Kiosk;
	index: number;
}

const inter = Inter({ subsets: ['latin'] });

export default function KioskCard({ kiosk: { slug, _id, displayName, iStop }, index }: KioskCardProps) {
	const KioskCardRef = useRef<HTMLDivElement>(null);
	const [focusedKiosk, setFocusedKiosk] = useRecoilState(focusedKioskIdState);

	// state for health status, to be passed into KioskStatusBadge as a prop
	const [healthStatus, setHealthStatus] = useState(HealthStatus.UNKNOWN);

	// // for each KioskObject, get the health status
	// Object.values(KioskObject).forEach(async (kioskObject) => {
	// 	if (typeof kioskObject === 'number') {
	// 		const status = await getStatus(_id, kioskObject);
	// 		setHealthStatus(status);
	// 	}
	// 	// console.log('kioskobj', kioskObject);
	// 	// const status = await getStatus(_id, kioskObject);
	// 	// setHealthStatus(status);
	// });

	useEffect(() => {
		if (focusedKiosk === _id && KioskCardRef.current) {
			KioskCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
			KioskCardRef.current.focus();
		}
	}, [focusedKiosk, _id]);

	// todo wire this up
	const kioskCardClasses = clsx(styles.kioskCard, {
		[styles.healthy]: healthStatus === HealthStatus.HEALTHY,
		[styles.warning]: healthStatus === HealthStatus.WARNING,
		[styles.critical]: healthStatus === HealthStatus.CRITICAL,
		[styles.unknown]: healthStatus === HealthStatus.UNKNOWN
	});

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<div
			className={kioskCardClasses}
			id={_id}
			ref={KioskCardRef}
			tabIndex={index}
			onClick={() => setFocusedKiosk(_id)}
			role="button"
			onBlur={() => setFocusedKiosk(null)}
		>
			<div className={styles.badges}>
				<KioskStatusBadge kioskObject={KioskObject.Button} id={_id} />
				<KioskStatusBadge kioskObject={KioskObject.LED} id={_id} />
				<KioskStatusBadge kioskObject={KioskObject.LCD} id={_id} />
			</div>
			<div className={styles.kioskName}>
				<h2>{displayName}</h2>
				{iStop && <IStopIcon />}
			</div>

			<div className={styles.buttonContainer}>
				<Link href={`https://kiosk.mtd.org/kiosks/${slug.current}/`} target="_blank" className={`${inter.className} button`}>
					View
				</Link>
				<Link href={`dashboard/issues/${_id}`} className={`${inter.className} button`}>
					Issue Tracker
				</Link>
				{/* <button className={styles.button} onClick={() => router.push(`/kiosks/${slug.current}/manage`)}>
					Manage Ads
				</button> */}
			</div>
			{/* </Link> */}
		</div>
	);
}
