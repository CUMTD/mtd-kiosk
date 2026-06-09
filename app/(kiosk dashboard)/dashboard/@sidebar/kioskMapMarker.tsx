'use client';

import { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import KioskMarker from '../../../../components/map/kioskMarker';
import { focusedKioskIdState, kioskAtomFamily } from '../../../../state/sidebarState';

interface Props {
	kioskId: string;
}
export default function KioskMapMarker({ kioskId }: Readonly<Props>) {
	const kioskAtom = useMemo(() => kioskAtomFamily(kioskId), [kioskId]);
	const { kiosk, health } = useAtomValue(kioskAtom);
	const setFocusKioskId = useSetAtom(focusedKioskIdState);
	const setFocus = useCallback(() => {
		setFocusKioskId(kioskId);
	}, [kioskId, setFocusKioskId]);

	return <KioskMarker kiosk={kiosk} health={health} setFocusCallback={setFocus} />;
}
