'use client';

import { ReactNode } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { AdsWithImageUrl } from '../../../../helpers/httpMethods';
import { Kiosk } from '../../../../sanity.types';
import { advertisementsState, allIconMessagesState, connectionErrorState, departureState, kioskState, showMapState } from '../../../../state/kioskState';
import IconMessageWithImages from '../../../../types/groqQueryTypes/IconMessageWithImages';
import GroupedRoute from '../../../../types/kioskDisplayTypes/GroupedRoute';

export interface KioskDisplayRootProps {
	kiosk: Kiosk;
	departures: GroupedRoute[] | null;
	ads: AdsWithImageUrl[];
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
		set(showMapState, kiosk.showKioskMap ?? false);
	}

	return <RecoilRoot initializeState={initializeKioskState}>{children}</RecoilRoot>;
}
