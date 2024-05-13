const Identicon = require('identicon.js');
import { useSession } from 'next-auth/react';
import styles from './userIcon.module.css';
import Image from 'next/image';

interface UserIconProps {
	identifier?: string;
}

export default function UserIcon({ identifier }: UserIconProps) {
	const { data: session } = useSession();
	var identicon = null;

	var options = {
		margin: 0.2, // 20% margin
		size: 420, // 420px
		format: 'svg' // use SVG instead of PNG
	};

	var name = session?.user?.name;

	if (identifier) {
		name = identifier;
	}

	let hashed = require('crypto').createHash('sha256').update(name).digest('hex');
	identicon = new Identicon(hashed, options).toString();
	return (
		<div className={styles.avatarContainer}>
			{identicon && <Image className={styles.avatar} src={`data:image/svg+xml;base64,${identicon}`} alt="User Avatar" width={50} height={50} />}
		</div>
	);
}
