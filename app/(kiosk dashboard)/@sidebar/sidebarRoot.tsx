'use client';

import { ReactNode } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { Kiosk } from '../../../sanity.types';
import { allKiosksState, kioskHealthStatusesState } from '../../../state/sidebarState';
import { ServerHealthStatuses } from '../../../types/serverHealthStatuses';
import KioskHealthUpdater from './kioskHealthUpdater';

interface Props {
	kiosks: Kiosk[];
	healthStatuses: ServerHealthStatuses[] | null;
	children: ReactNode;
}

export default function SidebarRoot({ kiosks, healthStatuses, children }: Props) {
	function initializeState({ set }: MutableSnapshot) {
		set(allKiosksState, kiosks);
		set(kioskHealthStatusesState, healthStatuses ?? []);
	}

	return (
		<RecoilRoot initializeState={initializeState}>
			<KioskHealthUpdater />
			{children}
		</RecoilRoot>
	);
}
