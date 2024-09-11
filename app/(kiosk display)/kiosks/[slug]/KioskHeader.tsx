import clsx from 'clsx';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { kioskState } from '../../../../state/kioskState';
import styles from './KioskHeader.module.css';
import LiveClock from './LiveClock';

export default function KioskHeader() {
	const { iStop, displayName } = useRecoilValue(kioskState);

	const headerClasses = clsx({
		[styles.header]: true,
		[styles.headerIstop]: iStop
	});

	return (
		<header className={headerClasses}>
			<Image src="/logo.svg" alt="MTD" className={styles.logo} width={288} height={160} priority />
			<h1 className={styles.stopName}>{displayName}</h1>
			<LiveClock />
			{iStop && <Image src="/istop.svg" alt="iStop" className={styles.istopIcon} width={60} height={60} priority />}
		</header>
	);
}
