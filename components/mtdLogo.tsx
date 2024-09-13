import clsx from 'clsx';
import styles from './mtdLogo.module.css';

export default function MtdLogo() {
	const logoClasses = clsx({
		['logo']: true,
		[styles.logo]: true
	});

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 350" className={logoClasses}>
			<path
				className={styles.swoosh}
				d="M604 255.9c-70.4 47.4-151.1 13.2-215.3-3-63.7-17.3-147-33.7-252.7 61.7 84.5-46.6 162.4-9.6 234.8 9.3 64.1 16.1 159 14 233.2-68"
			/>
			<path className={styles.swoosh} d="M414.5 247.8l-.1.2c104.7 34.2 205.5 22.1 195.9-53.2-24 76.2-197.8 52.6-195.8 53" />
			<path
				className={styles.mtd}
				d="M557.4 103.9c0-24.3-11.7-37.2-45.9-37.2h-7l-18.7 107.7H505c34.3.1 52.4-24.8 52.4-70.5M500.7 223h-81.1l36-204.8h58.8c67 0 102.4 25.5 102.4 80.5 0 73.1-35.1 124.3-116.1 124.3M431.4 67.6h-56.8L347.1 223h-57.6L317 67.6h-55.9l8.8-49.4h170.3l-8.8 49.4zm-247.6 52.1l-69 103.2-31.1-104.7c-2 15.8-5 35.7-8.5 55.9L66.4 223H13.2L49.5 18.2h51.3l31.9 103 68.7-103h52.4L217.4 223h-53.3l8.8-48.9c3.6-20.1 7.1-38.6 10.9-54.4"
			/>
		</svg>
	);
}
