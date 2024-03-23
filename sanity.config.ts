import type { DocumentValues, InferSchemaValues } from '@sanity-typed/types';
import { defineConfig } from '@sanity-typed/types';
import { googleMapsInput } from '@sanity/google-maps-input';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import throwError from './helpers/throwError';
import { apiVersion, dataset, projectId } from './sanity/env';
import kiosk from './sanity/schemas/documents/kiosk';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

const config = defineConfig({
	basePath: '/studio',
	projectId,
	dataset,
	schema: {
		types: [kiosk]
	},
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

export default config;

export type SanityValues = InferSchemaValues<typeof config>;

export type SanityDocuments = DocumentValues<SanityValues>;
