import { defineField, defineType } from '@sanity/types';
import { LuLayoutTemplate } from 'react-icons/lu';

const kiosk = defineType({
	name: 'layoutClass',
	title: 'layoutClass',
	type: 'document',
	description: `A layout class that will be applied to the '<main>' element of the page. This is useful for A/B testing or customer styles for a specific kiosk.`,
	icon: LuLayoutTemplate,
	preview: { select: { title: 'className' } },
	fields: [
		defineField({
			name: 'active',
			title: 'Active',
			type: 'boolean',
			description: 'Whether or not this layout class is currently active.',
			initialValue: false,
			validation: (rule) => rule.required()
		}),
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
					.regex(/^[a-z]+([A-Z][a-z]*)*$/, { name: 'camelCase', invert: false })
					.error('Class name must be camelCase, and between 3 and 100 characters.')
		}),
		defineField({
			name: 'customCss',
			title: 'Custom CSS',
			type: 'code',
			description: 'Custom CSS that will be injected into the page globally.',
			options: { language: 'css', languageAlternatives: [], withFilename: false }
		}),
		defineField({
			name: 'kiosks',
			title: 'Kiosks',
			description: 'The kiosks that this layout class will be applied to.',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'kioskBundle' }, { type: 'kiosk' }] }]
		})
	]
});

export default kiosk;
