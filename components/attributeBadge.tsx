import { ReactElement } from 'react';
import styles from './attributeBadge.module.css';

interface AttributeBadgeProps {
	icon: ReactElement;
	text: string;
}

export default function AttributeBadge({ icon, text }: AttributeBadgeProps) {
	return (
		<div className={styles.badgeContainer}>
			{icon}
			<span>
				<b>{text}</b>
			</span>
		</div>
	);
}
