'use client';

import { ReactNode, useEffect } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { Kiosk } from '../../../sanity.types';
import { allKiosksState, kioskHealthStatusesState } from '../../../state/sidebarState';
import { ServerHealthStatuses } from '../../../types/serverHealthStatuses';

interface Props {
	kiosks: Kiosk[];
	healthStatuses: ServerHealthStatuses[] | null;
	children: ReactNode;
}

export default function SidebarRoot({ kiosks, healthStatuses, children }: Props) {
	useEffect(() => {
		console.log('kiosks: ', { kiosks, healthStatuses });
	}, [healthStatuses, kiosks]);

	function initializeState({ set }: MutableSnapshot) {
		set(allKiosksState, kiosks);
		set(kioskHealthStatusesState, healthStatuses ?? []);
	}

	return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;
}
