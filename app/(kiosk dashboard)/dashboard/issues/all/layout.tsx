// import type { Metadata } from 'next';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import { Metadata } from 'next';
import Header from '../../header';

export default async function Layout({
	children,
	sidebar
}: Readonly<{
	children: ReactNode;
	sidebar: ReactNode;
}>) {
	return <main className={styles.main}>{children}</main>;
}
