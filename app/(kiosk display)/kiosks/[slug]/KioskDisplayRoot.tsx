'use client';

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';
import { AdsWithImageUrl } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity.types';
import { advertisementsState, allIconMessagesState, connectionErrorState, departureState, kioskState } from '../../../../state/kioskState';
import IconMessageWithImages from '../../../../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';

export interface KioskDisplayRootProps {
	kiosk: Kiosk;
	departures: GroupedRoute[] | null;
	ads: AdsWithImageUrl[];
	iconMessages: IconMessageWithImages[];
	children: ReactNode;
}

function HydrateAtoms({ kiosk, departures, ads, iconMessages, children }: KioskDisplayRootProps) {
	useHydrateAtoms([
		[kioskState, kiosk],
		[departureState, departures ?? []],
		[connectionErrorState, !departures],
		[advertisementsState, ads],
		[allIconMessagesState, iconMessages]
	]);
	return <>{children}</>;
}

export default function KioskDisplayRoot({ kiosk, departures, ads, iconMessages, children }: KioskDisplayRootProps) {
	return (
		<Provider>
			<HydrateAtoms kiosk={kiosk} departures={departures} ads={ads} iconMessages={iconMessages}>
				{children}
			</HydrateAtoms>
		</Provider>
	);
}
