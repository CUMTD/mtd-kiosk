import Link from 'next/link';
import styles from './toolbar.module.css';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import UserIcon from './userIcon';

export default function Toolbar() {
	const { data: session } = useSession({ required: true });

	return (
		<div className={styles.toolbar}>
			<Link href="/">
				<div style={{ display: 'flex', gap: '1ch' }}>
					<MTDLogo />

					<h1 style={{ fontWeight: '500' }}>Kiosks</h1>
				</div>
			</Link>

			{session && (
				<div className={styles.authBox}>
					<div className={styles.user}>
						<p>
							Logged in as <b>{session?.user?.name}</b>
						</p>
						<Link className={styles.signOut} href="/api/auth/signout">
							Sign Out
						</Link>
					</div>
					<UserIcon />
				</div>
			)}
		</div>
	);
}

export function MTDLogo() {
	return <Image className={styles.logo} width={100} height={50} src="/mtd.svg" alt="MTD Logo" />;
}
