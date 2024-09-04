import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { RiAdvertisementFill } from 'react-icons/ri';
import AttributeBadge from './attributeBadge';
import HasLedSignIcon from './hasLedSignIcon';
import styles from './toolbar.module.css';
import UserIcon from './userIcon';

export default function Toolbar() {
	const { data: session } = useSession({ required: true });

	return (
		<div className={styles.toolbar}>
			<Link href="/" style={{ gridArea: 'logo' }} passHref>
				<div style={{ display: 'flex', gap: '1ch' }}>
					<MTDLogo />

					<h1 style={{ fontWeight: '500' }}>Kiosks</h1>
				</div>
			</Link>

			<div className={styles.links}>
				{/* <Link href="/" passHref>
					<AttributeBadge icon={<FaHome />} text="Dashboard" />
				</Link> */}

				<Link href="/led" passHref>
					<AttributeBadge icon={<HasLedSignIcon />} text="LED Superview" />
				</Link>

				<Link href="/studio/structure/advertisement" passHref>
					<AttributeBadge icon={<RiAdvertisementFill />} text="Manage Ads" />
				</Link>
			</div>

			{session && (
				<div className={styles.authBox}>
					<div className={styles.user}>
						<p>
							<b>{session?.user?.name}</b>
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
