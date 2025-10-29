export interface GBFSFeed {
	version: string;
	ttl: number;
	last_updated: number;
	data: Data;
}

export interface Data {
	en: En;
}

export interface En {
	feeds: Feed[];
}

export interface Feed {
	name: string;
	url: string;
}
