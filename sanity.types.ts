/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch';
	background?: string;
	foreground?: string;
	population?: number;
	title?: string;
};

export type SanityImagePalette = {
	_type: 'sanity.imagePalette';
	darkMuted?: SanityImagePaletteSwatch;
	lightVibrant?: SanityImagePaletteSwatch;
	darkVibrant?: SanityImagePaletteSwatch;
	vibrant?: SanityImagePaletteSwatch;
	dominant?: SanityImagePaletteSwatch;
	lightMuted?: SanityImagePaletteSwatch;
	muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions';
	height?: number;
	width?: number;
	aspectRatio?: number;
};

export type SanityFileAsset = {
	_id: string;
	_type: 'sanity.fileAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	source?: SanityAssetSourceData;
};

export type Advertisement = {
	_id: string;
	_type: 'advertisement';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	status?: number;
	name?: string;
	image?: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	displayOnAllKiosks?: boolean;
	kiosks?: Array<
		| {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'kioskBundle';
		  }
		| {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'kiosk';
		  }
	>;
	startDate?: string;
	endDate?: string;
};

export type KioskBundle = {
	_id: string;
	_type: 'kioskBundle';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	bundleName?: string;
	kiosks?: Array<{
		_ref: string;
		_type: 'reference';
		_weak?: boolean;
		_key: string;
		[internalGroqTypeReferenceTo]?: 'kiosk';
	}>;
};

export type IconMessage = {
	_id: string;
	_type: 'iconMessage';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	message?: string;
	lightModeSvg?: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	darkModeSvg?: {
		asset?: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
		};
		hotspot?: SanityImageHotspot;
		crop?: SanityImageCrop;
		_type: 'image';
	};
	displayOnAllKiosks?: boolean;
	kiosks?: Array<
		| {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'kioskBundle';
		  }
		| {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'kiosk';
		  }
	>;
	realtimeOnly?: boolean;
	acrossStreetOnly?: boolean;
};

export type SanityImageCrop = {
	_type: 'sanity.imageCrop';
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot';
	x?: number;
	y?: number;
	height?: number;
	width?: number;
};

export type SanityImageAsset = {
	_id: string;
	_type: 'sanity.imageAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	metadata?: SanityImageMetadata;
	source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData';
	name?: string;
	id?: string;
	url?: string;
};

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata';
	location?: Geopoint;
	dimensions?: SanityImageDimensions;
	palette?: SanityImagePalette;
	lqip?: string;
	blurHash?: string;
	hasAlpha?: boolean;
	isOpaque?: boolean;
};

export type Kiosk = {
	_id: string;
	_type: 'kiosk';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	displayName?: string;
	slug?: Slug;
	phoneticName?: string;
	stopId?: string;
	additionalStopIds?: Array<string>;
	iStop?: boolean;
	location?: Geopoint;
	isHorizontal?: boolean;
	hasLed?: boolean;
	ledIp?: string;
	useCentralizedService?: boolean;
	layoutClass?: {
		_ref: string;
		_type: 'reference';
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: 'layoutClass';
	};
};

export type LayoutClass = {
	_id: string;
	_type: 'layoutClass';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	className?: string;
	customCss?: Code;
};

export type Geopoint = {
	_type: 'geopoint';
	lat?: number;
	lng?: number;
	alt?: number;
};

export type Slug = {
	_type: 'slug';
	current?: string;
	source?: string;
};

export type Code = {
	_type: 'code';
	language?: string;
	filename?: string;
	code?: string;
	highlightedLines?: Array<number>;
};

export type AllSanitySchemaTypes =
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| SanityFileAsset
	| Advertisement
	| KioskBundle
	| IconMessage
	| SanityImageCrop
	| SanityImageHotspot
	| SanityImageAsset
	| SanityAssetSourceData
	| SanityImageMetadata
	| Kiosk
	| LayoutClass
	| Geopoint
	| Slug
	| Code;
export declare const internalGroqTypeReferenceTo: unique symbol;
