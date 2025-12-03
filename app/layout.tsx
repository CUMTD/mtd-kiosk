import { ReactNode } from 'react';
import { VercelToolbar } from '@vercel/toolbar/next';

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const shouldInjectToolbar = process.env.NODE_ENV === 'development';

	return (
		<html lang="en">
			<head>
				<link rel="preload" href="https://use.typekit.net/egw4kmy.css" as="style" />
				<link rel="stylesheet" href="https://use.typekit.net/egw4kmy.css" fetchPriority="high" />
			</head>
			<body>
				{children}
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
