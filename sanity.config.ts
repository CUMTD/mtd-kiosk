import { googleMapsInput } from '@sanity/google-maps-input';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import SanityStudioIcon from './components/sanityStudioIcon';
import throwError from './helpers/throwError';
import structure from './sanity/deskStructure';
import { apiVersion, dataset, projectId } from './sanity/env';
import advertisement from './sanity/schemas/documents/advertisement';
import kiosk from './sanity/schemas/documents/kiosk';
import { kioskBundle } from './sanity/schemas/documents/kioskBundle';
import iconMessage from './sanity/schemas/documents/iconMessage';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

const config = {
	basePath: '/studio',
	projectId,
	dataset,
	schema: {
		types: [kiosk, iconMessage, kioskBundle, advertisement]
	},
	title: '',
	icon: SanityStudioIcon,
	plugins: [
		googleMapsInput({
			apiKey,
			defaultLocation: {
				lat: 40.1139125,
				lng: -88.224896
			},
			defaultZoom: 12
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		structureTool({ structure })
	]
};

export default config;
