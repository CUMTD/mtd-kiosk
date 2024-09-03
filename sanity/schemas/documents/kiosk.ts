import { defineField, defineType } from '@sanity/types';
import StopListAutocomplete from '../../components/stopListAutocomplete';
import { CgDisplaySpacing } from 'react-icons/cg';

const kiosk = defineType({
	name: 'kiosk',
	title: 'Kiosks',
	type: 'document',
	icon: CgDisplaySpacing,
	groups: [
		{
			title: 'General',
			name: 'general'
		},
		{
			title: 'LED display',
			name: 'led'
		},
		{
			title: 'Development',
			name: 'development'
		}
	],
	preview: {
		select: {
			title: 'displayName',
			subtitle: 'stopId'
		}
	},
	fields: [
		defineField({
			name: 'displayName',
			title: 'Display Name',
			type: 'string',
			description: 'The name of the kiosk as it will be displayed to the public',
			group: 'general',
			validation: (rule) => rule.required().min(3).max(100).error('Display name must be between 3 and 100 characters')
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL slug for the LCD',
			group: 'general',

			options: {
				source: 'displayName'
			},
			validation: (rule) =>
				rule.required().custom((slug) => {
					if (slug?.current === undefined) {
						return 'Slug is required';
					}
					return /[a-z0-9-]+/.test(slug.current) || 'Slug is required and must be lowercase, alphanumeric, and hyphenated';
				})
		}),
		defineField({
			name: 'phoneticName',
			title: 'Phonetic Name',
			type: 'string',
			description: "How the kiosk's name should be pronounced",
			group: 'general',
			validation: (rule) => rule.min(3).error('Phonetic name must be at least 5 characters')
		}),
		defineField({
			name: 'stopId',
			title: 'Stop ID',
			type: 'string',
			group: 'general',

			description:
				'The GTFS stop_id of the stop where this kiosk is located. This can either be a parent stop (e.g., "SPFLDPRC") or a boarding point id, (e.g., "LSE:2")'
			// components: {
			// 	input: StopListAutocomplete
			// }
			// TODO: this does not want to work
			// validation: (rule) =>
			// 	rule.custom((val) => {
			// 		if (val === undefined) {
			// 			return 'Stop ID is required';
			// 		}

			// 		return /^[A-Z0-9]+(:[0-9]+)?/.test(val) || 'Please provide a validly formatted uppercase stop ID';
			// 	})
		}),
		defineField({
			name: 'iStop',
			title: 'iStop',
			type: 'boolean',
			initialValue: false,
			group: 'general',

			validation: (rule) => rule.required().error('iStop is required.')
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'geopoint',
			group: 'general',

			validation: (rule) => rule.required().error('Location is required.')
		}),
		defineField({
			name: 'isHorizontal',
			title: 'Horizontal Screen',
			type: 'boolean',
			group: 'general',
			initialValue: false
		}),
		defineField({
			name: 'hasLed',
			title: 'Has LED display',
			type: 'boolean',
			group: 'led',
			validation: (rule) => rule.required().error('Has LED is required.'),
			initialValue: true
		}),
		defineField({
			name: 'ledIp',
			title: 'LED IP',
			type: 'string',
			group: 'led',
			validation: (rule) =>
				rule.custom((val, ctx) => {
					const required = ctx.document?.hasLed === true;
					if (required && (val === undefined || val.length === 0)) {
						return 'LED IP is required';
					}

					if (val === undefined) {
						// it's optional if the 'hasLed' checkbox is not ticked.
						return true;
					}

					if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(val)) {
						return true;
					}

					return 'Invalid IP format.';
				})
		}),
		defineField({
			name: 'useCentralizedService',
			title: 'Use Centralized LED Service',
			type: 'boolean',
			group: 'development',
			initialValue: false
		}),
		defineField({
			name: 'networkSwitchIpAddress',
			title: 'Switch IP Address',
			type: 'string',
			group: 'networking'
			// validate that this is a valid IP address
		}),
		defineField({
			name: 'switchType',
			title: 'Switch Type',
			// dropdown of cisco, sonicwall, fortigate
			type: 'string',
			group: 'networking',
			// validate that this is one of the three options
			options: {
				list: ['cisco', 'sonicwall', 'fortigate', 'Cellular', 'Other/See notes']
			}
		}),
		defineField({
			name: 'PDUIpAddress',
			title: 'PDU IP Address',
			type: 'string',
			group: 'networking'
			// validate that this is a valid IP address
		})
	]
});

export default kiosk;

export type Kiosk = {
	_id: string;
	displayName: string;
	phoneticName: string;
	slug: {
		current: string;
	};
	stopId: string;
	iStop: boolean;
	location: {
		lat: number;
		lng: number;
	};
	hasLed: boolean;
	ledIp: string;
};
