'use client';

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';
import { newIssueKioskIdState, newIssueTicketState } from '../../../../../state/newIssueState';

interface Props {
	kioskId: string;
	children: ReactNode;
}

function HydrateAtoms({ kioskId, children }: Readonly<Props>) {
	useHydrateAtoms([
		[newIssueKioskIdState, kioskId],
		[
			newIssueTicketState,
			{
				kioskId,
				openedBy: 'System',
				description: '',
				title: ''
			}
		]
	]);
	return <>{children}</>;
}

export default function NewIssueRoot({ kioskId, children }: Readonly<Props>) {
	return (
		<Provider>
			<HydrateAtoms kioskId={kioskId}>{children}</HydrateAtoms>
		</Provider>
	);
}
