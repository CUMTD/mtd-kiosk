import { RiAdvertisementFill } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { Advertisement } from '../../../sanity.types';
import { client } from '../../lib/client';

function formatDate(date: Date) {
	const now = new Date();

	if (date.getFullYear() === now.getFullYear()) {
		return date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
	}
	return date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' });
}

const advertisement = defineType({
	name: 'advertisement',
	title: 'Advertisement',
	type: 'document',
	icon: RiAdvertisementFill,
	preview: {
		select: {
			title: 'name',
			startDateString: 'startDate',
			endDateString: 'endDate',
			media: 'image'
		},
		prepare(selection) {
			const { title, startDateString, endDateString, media } = selection;
			const now = new Date();
			const startDate = new Date(startDateString);
			const endDate = endDateString ? new Date(endDateString) : null;
			const dateRange = `${formatDate(startDate)} – ${endDate ? formatDate(endDate) : '∞'}`;

			let status = 0; // 0: Live, 1: Upcoming, 2: Expired
			let subtitle = '';
			if (startDate > now) {
				status = 1;
				subtitle = `🟡 Upcoming, runs: ${dateRange}`;
			} else if (endDate && endDate < now) {
				status = 2;
				subtitle = `❌ Expired, ran: ${dateRange}`;
			} else {
				status = 0;
				subtitle = `✅ Live, running ${dateRange}`;
			}

			return {
				title,
				subtitle,
				media,
				status
			};
		}
	},
	fields: [
		defineField({
			name: 'status',
			title: 'Status',
			type: 'number',
			hidden: true
		}),
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			description: 'The name of the advertisement. This is only used for internal reference and is not displayed anywhere on the kiosk.',
			validation: (rule) => rule.required().min(5).max(100).error('Name must be between 5 and 100 characters')
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			description: 'Must be exactly 1080 x 480 pixels',
			options: {
				accept: 'image/*'
			},
			validation: (rule) =>
				rule.required().custom((image) => {
					if (!image || !image.asset) {
						return true; // Skip validation if there's no image
					}
					return client.fetch('*[_id == $id][0]{metadata{dimensions}}', { id: image.asset._ref }).then(({ metadata }) => {
						const { width, height } = metadata.dimensions;
						const aspectRatio = width / height;
						if (width === 1080 && height === 480) {
							return true; // Exact dimensions check
						} else if (Math.abs(aspectRatio - 2.25) < 0.01) {
							return true; // Aspect ratio check with tolerance
						}
						return 'Image must be exactly 1080 x 480 pixels or have a 2.25:1 aspect ratio';
					});
				})
		}),
		defineField({
			name: 'displayOnAllKiosks',
			title: 'Display On All Kiosks',
			type: 'boolean',
			description: 'If unchecked, you will be able to manually pick Kiosks and Kiosk Bundles.',
			options: {
				layout: 'checkbox'
			},
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
			initialValue: () => new Date().toISOString(),
			validation: (rule) => rule.required().error('Start date is required')
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'datetime',
			description: '(Optional) When the ad should stop displaying',
			validation: (rule) =>
				rule.custom((endDate, context) => {
					const { startDate } = <Advertisement>context.parent;
					if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
						return 'End date cannot be before start date';
					}
					return true;
				})
		})
	],
	orderings: [
		{
			name: 'status',
			title: 'Order By Status',
			by: [
				{ field: 'status', direction: 'asc' }, // Sort by status first
				{ field: 'startDate', direction: 'asc' }, // Then by startDate
				{ field: 'endDate', direction: 'asc' } // Then by endDate
			]
		},
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
