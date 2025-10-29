'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { GetGbfsFreeBikeStatus } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { gbfsBikeStatus } from '../../../../state/kioskState';

const GBFS_MESSAGE_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_GBFS_MESSAGE_UPDATE_INTERVAL ?? '');

if (!GBFS_MESSAGE_UPDATE_INTERVAL || isNaN(GBFS_MESSAGE_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_GBFS_MESSAGE_UPDATE_INTERVAL is not defined');
}

// static component that updates GBFS atom
export default function GbfsUpdater() {
	const setGbfs = useSetRecoilState(gbfsBikeStatus);

	useEffect(() => {
		async function updateGbfs() {
			const gbfs = await GetGbfsFreeBikeStatus();

			setGbfs(gbfs);
		}
		updateGbfs();
		const timer = setInterval(updateGbfs, GBFS_MESSAGE_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [setGbfs]);

	return null;
}
