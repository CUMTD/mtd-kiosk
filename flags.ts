import { flag } from 'flags/next';

export const darkModeFlag = flag<boolean>({
	key: 'dark-mode',

	decide: () => false
});

export const generalMessageRegularFlag = flag<boolean>({
	key: 'general-message-regular',

	decide: () => false
});

export const generalMessageBlockingFlag = flag<boolean>({
	key: 'general-message-blocking',
	decide: () => false
});

export const noDeparturesFlag = flag<boolean>({
	key: 'no-departures',
	decide: () => false
});

// export const networkErrorFlag = flag<boolean>({
// 	key: 'network-error',
// 	decide: () => false
// });
