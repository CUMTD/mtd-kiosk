'use client';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import Toolbar from '../../components/toolbar';
import styles from './layout.module.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { showMapState } from '../../state/mapState';
import clsx from 'clsx';

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
