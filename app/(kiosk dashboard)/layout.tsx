// import type { Metadata } from 'next';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import Header from './header';
import styles from './layout.module.css';
import SessionWrapper from './sessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
	sidebar
}: Readonly<{
	children: ReactNode;
	sidebar: ReactNode;
}>) {
	const bodyClass = clsx(styles.layoutContainer, inter.className);

	return (
		<html lang="en">
			<body className={bodyClass}>
				<SessionWrapper>
					<Header />
					{children}
				</SessionWrapper>
				{sidebar}
			</body>
		</html>
	);
}
