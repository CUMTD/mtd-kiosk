import { RiAdvertisementFill } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

const advertisement = defineType({
	name: 'advertisement',
	title: 'Advertisements',
	type: 'document',
	icon: RiAdvertisementFill,
	preview: {
		select: {
			title: 'name',
			subtitle: 'endDate',
			media: 'image'
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;

			if (new Date(subtitle) < new Date()) {
				return {
					title: title,
					subtitle: `❌ expired on ${new Date(subtitle).toLocaleDateString()}`,
					media: media
				};
			}

			return {
				title: title,
				subtitle: subtitle ? `✅ live until ${new Date(subtitle).toLocaleDateString()}` : 'No end date',
				media: media
			};
		}
	},
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
			description: 'Must be 1080 x 480 pixels',
			validation: (rule) => rule.required().error('An image is required')
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
			description: 'Kiosks or Kiosk Bundles to display this ad on',
			of: [{ type: 'reference', to: [{ type: 'kioskBundle' }, { type: 'kiosk' }] }],
			hidden: ({ parent }) => parent.displayOnAllKiosks
		}),
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'datetime',
			description: 'When the ad should start displaying',
			validation: (rule) => rule.required().error('Start date is required')
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'datetime',
			description: '(Optional) When the ad should stop displaying'
			// validation: (rule) => rule.required().error('End date is required')
		})
	],
	orderings: [
		{
			name: 'startDateAsc',
			title: 'Start Date Ascending',
			by: [{ field: 'startDate', direction: 'asc' }]
		},
		{
			name: 'startDateDesc',
			title: 'Start Date Descending',
			by: [{ field: 'startDate', direction: 'desc' }]
		}
	]
});

export default advertisement;
