import { BiMessageRoundedError } from 'react-icons/bi';
import { defineField, defineType } from 'sanity';
import { getExtension, getImageDimensions } from '@sanity/asset-utils';

const iconMessage = defineType({
	name: 'iconMessage',
	title: 'Kiosk Icon Message',
	type: 'document',
	icon: BiMessageRoundedError,
	fields: [
		defineField({
			name: 'message',
			title: 'Message Text',
			type: 'string',
			validation: (rule) => rule.required().min(5).max(100).error('Message must be between 5 and 100 characters')
		}),
		defineField({
			name: 'lightModeSvg',
			title: 'Light Mode SVG',
			type: 'image',
			description: 'SVG, 1:1 aspect ratio, designed for use on light backgrounds',
			validation: (rule) =>
				rule.custom((value) => {
					if (!value || !value.asset || !value.asset._ref) {
						return true;
					}

					const filetype = getExtension(value.asset._ref);

					if (filetype !== 'svg') {
						return 'Image must be an SVG';
					}

					return true;
				})
		}),
		defineField({
			name: 'darkModeSvg',
			title: 'Dark Mode SVG',
			type: 'image',
			description: 'SVG, 1:1 aspect ratio, designed for use on dark backgrounds',
			validation: (rule) =>
				rule.custom((value) => {
					if (!value || !value.asset || !value.asset._ref) {
						return true;
					}

					const filetype = getExtension(value.asset._ref);

					if (filetype !== 'svg') {
						return 'Image must be an SVG';
					}

					return true;
				})
		}),
		defineField({
			name: 'displayOnAllKiosks',
			title: 'Display On All Kiosks',
			type: 'boolean',
			description: 'If unchecked, you will be able to manually pick Kiosks and Kiosk Bundles.',
			initialValue: true
		}),
		defineField({
			name: 'kiosks',
			title: 'Kiosks',
			type: 'array',
			description: 'Kiosks or Kiosk Bundles to display this message on',
			of: [{ type: 'reference', to: [{ type: 'kioskBundle' }, { type: 'kiosk' }] }],
			hidden: ({ parent }) => parent.displayOnAllKiosks
		}),
		defineField({
			name: 'realtimeOnly',
			title: 'Realtime Only',
			type: 'boolean',
			description: 'If checked, this message will only display on kiosks with realtime data showing',
			initialValue: false
		}),
		defineField({
			name: 'acrossStreetOnly',
			title: 'Across Street Only',
			type: 'boolean',
			description: 'If checked, this message will only display on kiosks that show additional departures for other boarding points',
			initialValue: false
		})
	]
});

export default iconMessage;
