'use client';

import { toSvg } from 'jdenticon';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import styles from './userIcon.module.css';

interface UserIconProps {
	identifier?: string;
}

export default function UserIcon({ identifier }: UserIconProps) {
	const { data: session } = useSession();
	const name = identifier || session?.user?.name || 'default';
	const svg = useMemo(() => toSvg(name, 50, { padding: 0.05 }), [name]);

	return (
		<div className={styles.avatarContainer}>
			<div className={styles.avatar} dangerouslySetInnerHTML={{ __html: svg }} aria-label="User Avatar" />
		</div>
	);
}
