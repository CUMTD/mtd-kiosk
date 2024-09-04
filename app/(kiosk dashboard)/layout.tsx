'use client';
// import type { Metadata } from 'next';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';
import Toolbar from '../../components/toolbar';
import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SessionProvider>
				<RecoilRoot>
					<BodyElements>{children}</BodyElements>
				</RecoilRoot>
			</SessionProvider>
		</html>
	);
}

function BodyElements({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const bodyClasses = clsx({
		[inter.className]: true,
		[styles.layoutContainer]: true
	});
	return (
		<body className={bodyClasses}>
			<header className={styles.header}>
				<Toolbar />
			</header>
			{children}
		</body>
	);
}
