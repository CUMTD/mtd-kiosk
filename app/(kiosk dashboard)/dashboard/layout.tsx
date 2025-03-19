// import type { Metadata } from 'next';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import Header from './header';
import styles from './layout.module.css';
import SessionWrapper from './sessionWrapper';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | MTD Kiosks',
		default: 'MTD Kiosks'
	},
	description: 'View and manage MTD kiosks.'
};

export default async function Layout({
	children,
	sidebar
}: Readonly<{
	children: ReactNode;
	sidebar: ReactNode;
}>) {
	const bodyClass = clsx(styles.layoutContainer, inter.className);

	return (
		<div className={bodyClass}>
			<SessionWrapper>
				<Header />
				{children}
			</SessionWrapper>
			{sidebar}
		</div>
	);
}
