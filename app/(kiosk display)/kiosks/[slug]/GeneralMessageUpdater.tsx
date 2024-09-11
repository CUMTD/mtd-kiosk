'use client';

import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getGeneralMessage } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { generalMessageState, kioskState } from '../../../../state/kioskState';

const GENERAL_MESSAGE_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_GENERAL_MESSAGE_UPDATE_INTERVAL ?? '');

if (!GENERAL_MESSAGE_UPDATE_INTERVAL || isNaN(GENERAL_MESSAGE_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_GENERAL_MESSAGE_UPDATE_INTERVAL is not defined');
}

// static component that updates departures atom
export default function GeneralMessageUpdater() {
	const { stopId } = useRecoilValue(kioskState);
	const setGeneralMessage = useSetRecoilState(generalMessageState);

	useEffect(() => {
		async function updateGeneralMessages() {
			if (!stopId || stopId.length === 0) {
				console.warn('No stop ID provided');
				return;
			}
			const generalMessages = await getGeneralMessage(stopId);

			// console.log('generalMessages', generalMessages);

			setGeneralMessage(generalMessages);
		}
		updateGeneralMessages();
		const timer = setInterval(updateGeneralMessages, GENERAL_MESSAGE_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [stopId, setGeneralMessage]);

	return null;
}
