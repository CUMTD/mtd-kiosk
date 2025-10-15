'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { RiAdvertisementFill, RiThermometerLine } from 'react-icons/ri';

import AttributeBadge from './attributeBadge';
import LedSignIcon from './ledSignIcon';
import MTDLogo from './mtdLogo';
import styles from './toolbar.module.css';
import UserIcon from './userIcon';
import { GoIssueTracks } from 'react-icons/go';
import { FaThermometerThreeQuarters } from 'react-icons/fa';

export default function Toolbar() {
	const { data: session } = useSession({ required: true });

	return (
		<div className={styles.toolbar}>
			<Link href="/dashboard" style={{ gridArea: 'logo' }} passHref>
				<div className={styles.logo}>
					<MTDLogo />
					<h1 style={{ fontWeight: '500' }}>Kiosks</h1>
				</div>
			</Link>

			<div className={styles.links}>
				<Link href="/dashboard/issues" title="All Issues">
					<AttributeBadge icon={<GoIssueTracks />} text="All Issues" />
				</Link>
				<Link href="/dashboard/led" title="LEDs">
					<AttributeBadge icon={<LedSignIcon alt="" title="" />} text="LEDs" />
				</Link>

				<Link href="/dashboard/temps" title="Temps">
					<AttributeBadge icon={<FaThermometerThreeQuarters />} text="Temps" />
				</Link>

				<Link href="/studio/structure/advertisements" title="Manage Ads">
					<AttributeBadge icon={<RiAdvertisementFill />} text="Manage Ads" />
				</Link>
			</div>

			{session && (
				<div className={styles.authBox}>
					<div className={styles.user}>
						<p>
							<b>{session?.user?.name}</b>
						</p>
						<button className={styles.signOut} onClick={() => signOut()}>
							Sign Out
						</button>
					</div>
					<UserIcon />
				</div>
			)}
		</div>
	);
}
