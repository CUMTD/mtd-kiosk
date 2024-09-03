'use client';
import { RecoilRoot } from 'recoil';
import { KioskDisplay } from './KioskDisplay';
import { Kiosk } from '../../../../sanity.types';

export interface KioskDisplayRootProps {
	kiosk: Kiosk;
	horizontal?: boolean;
}

export default function KioskDisplayRoot({ kiosk, horizontal }: KioskDisplayRootProps) {
	return (
		<RecoilRoot>
			<KioskDisplay kiosk={kiosk} horizontal={horizontal} />
		</RecoilRoot>
	);
}
