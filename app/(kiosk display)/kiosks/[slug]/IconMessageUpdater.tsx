import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchKioskIconMessagesByKioskId } from '../../../../helpers/httpMethods';
import throwError from '../../../../helpers/throwError';
import { allIconMessagesState, kioskState } from '../../../../state/kioskState';

const ICON_MESSAGES_FETCH_INTERVAL = parseInt(
	process.env.NEXT_PUBLIC_ICON_MESSAGES_FETCH_INTERVAL ?? throwError('NEXT_PUBLIC_ICON_MESSAGES_FETCH_INTERVAL is not defined')
);

export default function IconMessageUpdater() {
	const { _id: id } = useRecoilValue(kioskState);
	const setCurrentIconMessages = useSetRecoilState(allIconMessagesState);

	useEffect(() => {
		async function updateIconMessages() {
			const iconMessages = await fetchKioskIconMessagesByKioskId(id);

			setCurrentIconMessages(iconMessages);
		}
		updateIconMessages();
		const timer = setInterval(updateIconMessages, ICON_MESSAGES_FETCH_INTERVAL);

		return () => clearInterval(timer);
	}, [id, setCurrentIconMessages]);

	return null;
}
