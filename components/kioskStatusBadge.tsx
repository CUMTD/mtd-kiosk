import styles from './kioskStatusBadge.module.css';

interface KioskStatusBadgeProps {
	up: boolean;
	text: string;
}

export default function KioskStatusBadge({ up, text }: KioskStatusBadgeProps) {
	return (
		<div className={styles.kioskStatusBadge}>
			<span
				className={styles.indicatorLight}
				style={{
					backgroundColor: up ? 'green' : 'red'
				}}
			></span>
			{text} {up ? 'up' : 'down'}
		</div>
	);
}
