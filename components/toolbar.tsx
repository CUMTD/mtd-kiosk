import ShowMapButton from './showMapButton';
import styles from './toolbar.module.css';
import Image from 'next/image';

interface ToolbarProps {
	mapButton?: boolean;
}

export default function Toolbar({ mapButton }: ToolbarProps) {
	return (
		<div className={styles.toolbar}>
			<div style={{ display: 'flex', gap: '1ch' }}>
				<MTDLogo />

				<h1 style={{ fontWeight: '500' }}>Kiosk Dashboard</h1>
			</div>
			{mapButton && <ShowMapButton />}
		</div>
	);
}

export function MTDLogo() {
	return <Image width={100} height={50} src="/mtd.svg" alt="MTD Logo" />;
}
