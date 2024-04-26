import { RiAdvertisementFill } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

const advertisement = defineType({
	name: 'advertisement',
	title: 'Advertisement',
	type: 'document',
	icon: RiAdvertisementFill,
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required().min(5).max(100).error('Name must be between 5 and 100 characters')
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			description: 'Image for portrait mode displays (should be 1080px x 480px)',
			validation: (rule) => rule.required().error('An image is required')
		}),
		defineField({
			name: 'landscapeImage',
			title: 'Landscape Image',
			type: 'image',
			description: 'Optional image for landscape mode displays (should be 540px x 1080px)'
			// TODO: only required if displayOnAllKiosks is true? depends on if we get rid of horizontal kiosks
		}),
		defineField({
			name: 'displayOnAllKiosks',
			title: 'Display On All Kiosks',
			type: 'boolean',
			description: 'If set to true, you must include a landscape image. If unchecked, you will be able to manually pick kiosks to display this ad on',
			initialValue: true
		}),
		defineField({
			name: 'kiosks',
			title: 'Kiosks',
			type: 'array',
			description: 'Kiosks that should display this ad',
			of: [{ type: 'reference', to: [{ type: 'kiosk' }] }],
			hidden: ({ parent }) => parent.displayOnAllKiosks
		}),
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'datetime',
			validation: (rule) => rule.required().error('Start date is required')
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'datetime',
			validation: (rule) => rule.required().error('End date is required')
		})
	]
});

export default advertisement;
