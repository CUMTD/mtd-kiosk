import { getImageDimensions } from '@sanity/asset-utils';
import { RiAdvertisementFill } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { Advertisement } from '../../../sanity.types';
import AdStatusIndicator from '../../components/AdStatusIndicator';

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
			media: 'image',
			status: 'status'
		},
		prepare(selection) {
			const { title, startDateString, endDateString, media, status } = selection;
			const startDate = new Date(startDateString);
			const endDate = endDateString ? new Date(endDateString) : null;
			const dateRange = `${formatDate(startDate)} – ${endDate ? formatDate(endDate) : '∞'}`;

			let subtitle = '';
			if (status == 1) {
				subtitle = `🟡 Upcoming, runs: ${dateRange}`;
			} else if (status == 2) {
				subtitle = `❌ Expired, ran: ${dateRange}`;
			} else {
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
			readOnly: true,
			components: {
				input: AdStatusIndicator
			}
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
			description: 'Must be at least 1080 x 480 pixels',
			options: {
				accept: 'image/*'
			},
			validation: (rule) =>
				rule.custom((image) => {
					if (!image || !image.asset || !image.asset._ref) {
						return true;
					}

					const { width, height } = getImageDimensions(image.asset._ref);

					if (width < 1080 || height < 480) {
						return 'Image must be at least 1080x480 pixels.';
					}

					// if (Math.abs(aspectRatio - 2.25) > 0.02) {
					// 	return 'Image must have a 2.25:1 aspect ratio (1920x480)';
					// }

					return true;
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
				{ field: 'status', direction: 'asc' } // Sort by status first
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
