// import type { Metadata } from 'next';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import styles from './layout.module.css';
import SessionWrapper from './sessionWrapper';
import { SessionContent } from './SessionContent';

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
					<SessionContent>
						{children} {sidebar}
					</SessionContent>
				</SessionWrapper>
			</body>
		</html>
	);
}
