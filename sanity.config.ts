import { codeInput } from '@sanity/code-input';
import { googleMapsInput } from '@sanity/google-maps-input';
import { visionTool } from '@sanity/vision';
import { DocumentActionComponent } from 'sanity';
import { structureTool } from 'sanity/structure';
import SanityStudioIcon from './components/sanityStudioIcon';
import throwError from './helpers/throwError';
import structure from './sanity/deskStructure';
import { apiVersion, dataset, projectId } from './sanity/env';
import { ManuallyUpdateAdStatusAction, createImprovedAction } from './sanity/lib/actions';
import advertisement from './sanity/schemas/documents/advertisement';
import iconMessage from './sanity/schemas/documents/iconMessage';
import kiosk from './sanity/schemas/documents/kiosk';
import { kioskBundle } from './sanity/schemas/documents/kioskBundle';
import layoutClass from './sanity/schemas/documents/layoutClass';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? throwError('No NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');

const config = {
	auth: {
		projectId,
		dataset,
		mode: 'replace',
		redirectOnSingle: false,
		providers: [
			{
				name: 'saml',
				title: 'Entra ID',
				url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/528963b0'
			}
		]
	},
	basePath: '/studio',
	projectId,
	document: {
		actions: (prev: DocumentActionComponent[]) => {
			const existing = prev.map((originalAction) => (originalAction.action === 'publish' ? createImprovedAction(originalAction) : originalAction));

			return [...existing, ManuallyUpdateAdStatusAction];
		}
	},
	dataset,
	schema: {
		types: [kiosk, iconMessage, kioskBundle, advertisement, layoutClass]
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
		structureTool({ structure }),
		codeInput()
	]
};

export default config;
