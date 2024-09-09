'use client';

import Toolbar from '../../components/toolbar';
import styles from './header.module.css';

export default function Header() {
	return (
		<header className={styles.header}>
			<Toolbar />
		</header>
	);
}
