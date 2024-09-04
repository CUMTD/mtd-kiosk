import { useSetRecoilState } from 'recoil';
import { allIconMessagesState } from '../../../../state/kioskState';
import { useEffect } from 'react';
import { fetchKioskIconMessagesByKioskId } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';

const ICON_MESSAGES_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_ICON_MESSAGES_FETCH_INTERVAL ?? '');

if (!ICON_MESSAGES_FETCH_INTERVAL || isNaN(ICON_MESSAGES_FETCH_INTERVAL)) {
	throwError('NEXT_PUBLIC_ICON_MESSAGES_FETCH_INTERVAL is not defined');
}

interface IconMessageUpdaterProps {
	kioskId: string;
}

export default function IconMessageUpdater({ kioskId }: IconMessageUpdaterProps) {
	const setCurrentIconMessages = useSetRecoilState(allIconMessagesState);

	useEffect(() => {
		async function updateIconMessages() {
			const iconMessages = await fetchKioskIconMessagesByKioskId(kioskId);

			setCurrentIconMessages(iconMessages);
		}
		updateIconMessages();
		const timer = setInterval(updateIconMessages, ICON_MESSAGES_FETCH_INTERVAL);

		return () => clearInterval(timer);
	}, [kioskId, setCurrentIconMessages]);

	return null;
}