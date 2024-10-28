'use client';

import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import KioskMarker from '../../../../components/map/kioskMarker';
import { focusedKioskIdState, kioskSelectorFamily } from '../../../../state/sidebarState';

interface Props {
	kioskId: string;
}
export default function KioskMapMarker({ kioskId }: Readonly<Props>) {
	const { kiosk, health } = useRecoilValue(kioskSelectorFamily(kioskId));
	const setFocusKioskId = useSetRecoilState(focusedKioskIdState);
	const setFocus = useCallback(() => {
		setFocusKioskId(kioskId);
	}, [kioskId, setFocusKioskId]);

	return <KioskMarker kiosk={kiosk} health={health} setFocusCallback={setFocus} />;
}
