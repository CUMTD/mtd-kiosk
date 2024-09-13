import { defineField, defineType } from '@sanity/types';
import { LuLayout } from 'react-icons/lu';

const kiosk = defineType({
	name: 'layoutClass',
	title: 'layoutClass',
	type: 'document',
	description: `A layout class that will be applied to the '<main>' element of the page. This is useful for A/B testing or customer styles for a specific kiosk.`,
	icon: LuLayout,
	preview: {
		select: {
			title: 'className'
		}
	},
	fields: [
		defineField({
			name: 'className',
			title: 'Class Name',
			type: 'string',
			description: 'The name of the class that will be applied.',
			validation: (rule) =>
				rule
					.required()
					.min(3)
					.max(100)
					.regex(/^[a-z]+([A-Z][a-z]*)*$/, {
						name: 'camelCase',
						invert: false
					})
					.error('Class name must be camelCase, and between 3 and 100 characters.')
		}),
		defineField({
			name: 'customCss',
			title: 'Custom CSS',
			type: 'code',
			description: 'Custom CSS that will be injected into the page globally.',
			options: {
				language: 'css',
				languageAlternatives: [],
				withFilename: false
			}
		})
	]
});

export default kiosk;
