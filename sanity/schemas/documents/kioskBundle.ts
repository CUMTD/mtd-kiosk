import { defineField, defineType } from '@sanity/types';
import { FaLayerGroup } from 'react-icons/fa';

export const kioskBundle = defineType({
	name: 'kioskBundle',
	title: 'Kiosk Bundles',
	type: 'document',
	icon: FaLayerGroup,
	preview: {
		select: {
			title: 'bundleName',
			subtitle: 'kiosks'
		},
		prepare(selection) {
			const { title, subtitle } = selection;

			return {
				title: title,
				subtitle: `${subtitle.length === 1 ? '1 kiosk' : `${subtitle.length} kiosks`}`
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
			]
		})
	]
});
