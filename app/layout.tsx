'use client';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RecoilRoot } from 'recoil';
import Toolbar from '../components/toolbar';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
// 	title: 'Kiosk Dashboard',
// 	description: 'View, manage and monitor MTD kiosks'
// };

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<RecoilRoot>
				<body className={inter.className}>
					<header>
						<Toolbar mapButton />
					</header>
					{children}
				</body>
			</RecoilRoot>
		</html>
	);
}
