import { defineField, defineType } from '@sanity/types';
import { FaLayerGroup } from 'react-icons/fa';

export const kioskBundle = defineType({
	name: 'kioskBundle',
	title: 'Kiosk Bundles',
	type: 'document',
	description: 'A collection of kiosks that are grouped together for the purpose of easily applying ads sold in a bundle.',
	icon: FaLayerGroup,
	preview: {
		select: {
			title: 'bundleName',
			subtitle: 'kiosks'
		},
		prepare(selection: { subtitle: Array<unknown>; title: string }) {
			const { title, subtitle } = selection;
			const kioskCount = subtitle?.length ?? 0;

			return {
				title: title,
				subtitle: `${kioskCount === 1 ? '1 kiosk' : `${kioskCount} kiosks`}`
			};
		}
	},
	fields: [
		defineField({
			name: 'bundleName',
			title: 'Bundle Name',
			type: 'string',

			validation: (rule) => rule.required().min(3).max(100).error('Bundle name must be between 3 and 100 characters')
		}),
		// array of references to kiosks
		defineField({
			name: 'kiosks',
			title: 'Kiosks',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'kiosk' }]
				}
			],
			validation: (rule) => rule.required().min(1).error('At least one kiosk must be included in the bundle.')
		})
	]
});
