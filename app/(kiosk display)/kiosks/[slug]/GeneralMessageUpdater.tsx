'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { generalMessageState } from '../../../../state/kioskState';
import throwError from '../../../../helpers/throwError';
import { getGeneralMessage } from '../../../../helpers/httpMethods';

const GENERAL_MESSAGE_UPDATE_INTERVAL = parseInt(process.env.NEXT_PUBLIC_GENERAL_MESSAGE_UPDATE_INTERVAL ?? '');

if (!GENERAL_MESSAGE_UPDATE_INTERVAL || isNaN(GENERAL_MESSAGE_UPDATE_INTERVAL)) {
	throwError('NEXT_PUBLIC_GENERAL_MESSAGE_UPDATE_INTERVAL is not defined');
}

interface GeneralMessageUpdaterProps {
	stopId: string;
}

// static component that updates departures atom
export default function GeneralMessageUpdater({ stopId }: GeneralMessageUpdaterProps) {
	const setGeneralMessage = useSetRecoilState(generalMessageState);

	useEffect(() => {
		async function updateGeneralMessages(_stopId: string) {
			const generalMessages = await getGeneralMessage(stopId);

			if (!generalMessages) {
				return;
			}

			setGeneralMessage(generalMessages);
		}
		updateGeneralMessages(stopId);
		const timer = setInterval(updateGeneralMessages, GENERAL_MESSAGE_UPDATE_INTERVAL);

		return () => clearInterval(timer);
	}, [stopId, setGeneralMessage]);

	return null;
}
