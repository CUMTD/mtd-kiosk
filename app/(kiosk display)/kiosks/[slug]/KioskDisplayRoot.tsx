'use client';

import { ReactNode } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { Advertisement, Kiosk } from '../../../../sanity.types';
import { advertisementsState, allIconMessagesState, connectionErrorState, departureState, kioskState } from '../../../../state/kioskState';
import IconMessageWithImages from '../../../../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';

export interface KioskDisplayRootProps {
	kiosk: Kiosk;
	departures: GroupedRoute[] | null;
	ads: Advertisement[];
	iconMessages: IconMessageWithImages[];
	children: ReactNode;
}

export default function KioskDisplayRoot({ kiosk, departures, ads, iconMessages, children }: KioskDisplayRootProps) {
	function initializeKioskState({ set }: MutableSnapshot) {
		set(kioskState, kiosk);
		if (departures) {
			set(departureState, departures);
			set(connectionErrorState, false);
		} else {
			set(connectionErrorState, true);
		}
		set(advertisementsState, ads);
		set(allIconMessagesState, iconMessages);
	}

	return <RecoilRoot initializeState={initializeKioskState}>{children}</RecoilRoot>;
}
