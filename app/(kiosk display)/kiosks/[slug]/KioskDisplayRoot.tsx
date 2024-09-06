'use client';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export interface KioskDisplayRootProps {
	children: ReactNode;
}

export default function KioskDisplayRoot({ children }: KioskDisplayRootProps) {
	return <RecoilRoot>{children}</RecoilRoot>;
}
