import clsx from 'clsx';
import styles from './InfoCard.module.css';

interface InfoCardProps {
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
	button?: React.ReactElement;
	onClick?: () => void;
	tall?: boolean;
	wide?: boolean;
	verticalCenter?: boolean;
}

export default function InfoCard({ children, title, subtitle, onClick, button, wide, tall, verticalCenter }: InfoCardProps) {
	const classes = clsx({ [styles.infoCard]: true, [styles.wide]: wide, [styles.tall]: tall });

	const contentClasses = clsx({ [styles.content]: true, [styles.tallContent]: tall, [styles.verticalCenter]: verticalCenter });

	return (
		<div className={classes}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				{subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
				{button}
			</div>
			<div className={contentClasses}>{children}</div>
		</div>
	);
}
