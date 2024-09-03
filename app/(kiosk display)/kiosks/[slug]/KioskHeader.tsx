import clsx from 'clsx';
import styles from './KioskHeader.module.css';
import LiveClock from './LiveClock';

interface KioskHeaderProps {
	stopName: string | undefined;
	iStop: boolean | undefined;
}

export default function KioskHeader({ stopName, iStop }: KioskHeaderProps) {
	const headerClasses = clsx(styles.header, {
		[styles.headerIstop]: iStop
	});

	return (
		<header className={headerClasses}>
			<img src="/logo.svg" alt="MTD" className={styles.logo} />
			<h1 className={styles.stopName}>{stopName}</h1>
			<time className={styles.time}>
				<LiveClock />
			</time>

			{iStop && <img src="/istop.svg" alt="iStop" className={styles.istopIcon} />}
		</header>
	);
}
