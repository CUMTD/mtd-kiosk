import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="preload" href="https://use.typekit.net/egw4kmy.css" as="style" />
				<link rel="stylesheet" href="https://use.typekit.net/egw4kmy.css" fetchPriority="high" />
			</head>
			<body>{children}</body>
		</html>
	);
}
