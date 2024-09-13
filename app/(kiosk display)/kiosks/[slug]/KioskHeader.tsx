import clsx from 'clsx';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import MTDLogo from '../../../../components/mtdLogo';
import { kioskState } from '../../../../state/kioskState';
import styles from './KioskHeader.module.css';
import LiveClock from './LiveClock';

export default function KioskHeader() {
	const { iStop, displayName } = useRecoilValue(kioskState);

	const headerClasses = clsx({
		['header']: true,
		[styles.header]: true,
		[styles.headerIstop]: iStop
	});

	const stopNameClasses = clsx({
		['stopName']: true,
		[styles.stopName]: true
	});

	const istopIconClasses = clsx({
		['istopIcon']: true,
		[styles.istopIcon]: true
	});

	return (
		<header className={headerClasses}>
			<MTDLogo />
			<h1 className={stopNameClasses}>{displayName}</h1>
			<LiveClock />
			{iStop && <Image src="/istop.svg" alt="iStop" className={istopIconClasses} width={60} height={60} priority />}
		</header>
	);
}
