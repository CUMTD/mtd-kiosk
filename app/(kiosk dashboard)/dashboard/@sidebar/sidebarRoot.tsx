'use client';

import { Provider, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';
import { Kiosk } from '../../../../sanity.types';
import { allKiosksState, kioskHealthStatusesState } from '../../../../state/sidebarState';
import { ServerHealthStatuses } from '../../../../types/serverHealthStatuses';
import KioskHealthUpdater from './kioskHealthUpdater';

interface Props {
	kiosks: Kiosk[];
	healthStatuses: ServerHealthStatuses[] | null;
	children: ReactNode;
}

function HydrateAtoms({ kiosks, healthStatuses, children }: Props) {
	useHydrateAtoms([
		[allKiosksState, kiosks],
		[kioskHealthStatusesState, healthStatuses ?? []]
	]);
	return <>{children}</>;
}

export default function SidebarRoot({ kiosks, healthStatuses, children }: Props) {
	return (
		<Provider>
			<HydrateAtoms kiosks={kiosks} healthStatuses={healthStatuses}>
				<KioskHealthUpdater />
				{children}
			</HydrateAtoms>
		</Provider>
	);
}
