'use client';

import { ReactNode } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { newIssueKioskIdState, newIssueTicketState } from '../../../../../state/newIssueState';

interface Props {
	kioskId: string;
	children: ReactNode;
}

export default function NewIssueRoot({ kioskId, children }: Readonly<Props>) {
	function initializeState({ set }: MutableSnapshot): void {
		set(newIssueKioskIdState, kioskId);
		set(newIssueTicketState, {
			kioskId,
			openedBy: 'System',
			description: '',
			title: ''
		});
	}

	return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;
}
