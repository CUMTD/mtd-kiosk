import { ReactNode } from 'react';
import styles from './layout.module.css';

export default async function Layout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return <main className={styles.main}>{children}</main>;
}
