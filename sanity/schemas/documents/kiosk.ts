import { defineField, defineType } from '@sanity-typed/types';
import StopListAutocomplete from '../../components/stopListAutocomplete';

const kiosk = defineType({
	name: 'kiosk',
	title: 'Kiosk',
	type: 'document',
	fields: [
		defineField({
			name: 'displayName',
			title: 'Display Name',
			type: 'string',
			description: 'The name of the kiosk as it will be displayed to the public',
			validation: (rule) => rule.required().min(5).max(100).error('Display name must be between 5 and 100 characters')
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL slug for the LCD',
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
			validation: (rule) => rule.required().error('Phonetic name is required.').min(5).error('Phonetic name must be at least 5 characters')
		}),
		defineField({
			name: 'stopId',
			title: 'Stop ID',
			type: 'string',
			description:
				'The GTFS stop_id of the stop where this kiosk is located. This can either be a parent stop (e.g., "SPFLDPRC") or a boarding point id, (e.g., "LSE:2")',
			components: {
				input: StopListAutocomplete
			},
			validation: (rule) =>
				rule
					.required()
					.error('Stop ID is required.')
					.custom((val) => {
						if (val === undefined) {
							return 'Stop ID is required';
						}

						return /^[A-Z0-9]+(:[0-9]+)?/.test(val) || 'Please provide a validly formatted uppercase stop ID';
					})
		}),
		defineField({
			name: 'iStop',
			title: 'iStop',
			type: 'boolean',
			initialValue: false,
			validation: (rule) => rule.required().error('iStop is required.')
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'geopoint',
			validation: (rule) => rule.required().error('Location is required.')
		}),
		defineField({
			name: 'hasLed',
			title: 'Has LED',
			type: 'boolean',
			validation: (rule) => rule.required().error('Has LED is required.'),
			initialValue: true
		}),
		defineField({
			name: 'ledIp',
			title: 'LED IP',
			type: 'string',
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
		})
	]
});

export default kiosk;
