import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { googleMapsInput } from '@sanity/google-maps-input';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';
import throwError from './helpers/throwError';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

export default defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	schema,
	plugins: [
		structureTool(),
		googleMapsInput({
			apiKey,
			defaultLocation: {
				lat: 40.1139125,
				lng: -88.224896
			},
			defaultZoom: 12
		}),
		visionTool({ defaultApiVersion: apiVersion })
	]
});
