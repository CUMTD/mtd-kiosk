'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { RiAdvertisementFill } from 'react-icons/ri';
import AttributeBadge from './attributeBadge';
import LedSignIcon from './ledSignIcon';
import MTDLogo from './mtdLogo';
import styles from './toolbar.module.css';
import UserIcon from './userIcon';

export default function Toolbar() {
	const { data: session } = useSession({ required: true });

	return (
		<div className={styles.toolbar}>
			<Link href="/" style={{ gridArea: 'logo' }} passHref>
				<div className={styles.logo}>
					<MTDLogo />
					<h1 style={{ fontWeight: '500' }}>Kiosks</h1>
				</div>
			</Link>

			<div className={styles.links}>
				<Link href="/led" passHref>
					<AttributeBadge icon={<LedSignIcon alt="" title="" />} text="LED Superview" />
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
