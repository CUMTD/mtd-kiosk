import StopListAutocomplete from '../../components/stopListAutocomplete';
import { defineField, defineType } from 'sanity';

const kiosk = defineType({
	name: 'kiosk',
	title: 'Kiosk',
	type: 'document',
	fields: [
		defineField({
			name: 'displayName',
			title: 'Display Name',
			type: 'string',
			description: 'The name of the kiosk as it will be displayed to the public'
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description: 'URL slug for the LCD',
			options: {
				source: 'displayName'
			}
		}),
		defineField({
			name: 'phoneticName',
			title: 'Phonetic Name',
			type: 'string',
			description: "How the kiosk's name should be pronounced"
		}),
		defineField({
			name: 'stopId',
			title: 'Stop ID',
			type: 'string',
			description:
				'The GTFS stop_id of the stop where this kiosk is located. This can either be a parent stop (e.g., SPFLDPRC) or a boarding point id, (e.g., LSE:2)',
			components: {
				input: StopListAutocomplete
			}
		}),
		defineField({
			name: 'iStop',
			title: 'iStop',
			type: 'boolean'
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'geopoint'
		}),
		defineField({
			name: 'hasLed',
			title: 'Has LED',
			type: 'boolean'
		}),
		defineField({
			name: 'ledIp',
			title: 'LED IP',
			type: 'string',
			validation: (rule) =>
				rule.custom<string>((val, ctx) => {
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
