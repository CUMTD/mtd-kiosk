import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/egw4kmy.css"></link>
			</head>
			<body>{children}</body>
		</html>
	);
}
