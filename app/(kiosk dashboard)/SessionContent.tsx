'use client';
import { useSession } from 'next-auth/react';
import Header from './header';
import { ReactNode } from 'react';

interface SessionContentProps {
	children: ReactNode;
}

export function SessionContent({ children }: SessionContentProps) {
	const { data: session } = useSession({ required: true });

	if (!session || !session.user) {
		return null;
	}

	return (
		<>
			<Header />
			{children}
		</>
	);
}
