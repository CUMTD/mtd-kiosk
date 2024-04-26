// 'use client';
import { useSession } from 'next-auth/react';
import KioskCards from '../components/kioskCards';
import KioskMap from '../components/kioskMap';
import styles from './page.module.css';
import IssuePage from './issues/[id]/page';
import { Filters } from '../components/Filters';
import { fetchKiosk, fetchKioskList } from '../helpers/httpMethods';

export default async function Home() {
	const kiosks = await fetchKioskList();

	return (
		<>
			{/* <Filters /> */}
			<KioskMap />
			<KioskCards kiosks={kiosks} />
		</>
	);
}
