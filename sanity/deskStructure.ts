import { CgDisplaySpacing } from 'react-icons/cg';
import { FaGear } from 'react-icons/fa6';
import type { StructureResolver } from 'sanity/structure';

const structure: StructureResolver = (S, _context) => {
	return S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Advertisements')
				.schemaType('advertisement')
				.child(
					S.documentTypeList('advertisement')
						.title('Advertisements')
						.defaultOrdering([
							{ field: 'status', direction: 'asc' }, // Sort by status first
							{ field: 'startDate', direction: 'asc' }, // Then by startDate
							{ field: 'endDate', direction: 'asc' } // Then by endDate
						])
				),
			S.listItem()
				.title('Kiosks')
				.icon(CgDisplaySpacing)
				.child(
					S.list()
						.title('Kiosks Types')
						.items([
							S.listItem()
								.title('Live Kiosks')
								.schemaType('kiosk')
								.child(
									S.documentTypeList('kiosk')
										.title('Live Kiosks')
										.filter('_type == "kiosk" && !(lower(displayName) match "development")')
										.defaultOrdering([{ field: 'displayName', direction: 'asc' }])
								),
							S.listItem()
								.title('Development Kiosks')
								.icon(FaGear)
								.schemaType('kiosk')
								.child(
									S.documentTypeList('kiosk')
										.title('Development Kiosks')
										.filter('_type == "kiosk" && lower(displayName) match "development"')
										.defaultOrdering([{ field: 'displayName', direction: 'asc' }])
								),
							S.listItem()
								.title('Kiosk Bundles')
								.schemaType('kioskBundle')
								.child(
									S.documentTypeList('kioskBundle')
										.title('Bundles')
										.defaultOrdering([{ field: 'bundleName', direction: 'asc' }])
								),
							S.listItem().title('Icon Messages').schemaType('iconMessage').child(
								S.documentTypeList('iconMessage').title('Messages')
								// .defaultOrdering([{ field: 'iconMessage', direction: 'asc' }])
							)
						])
				)
		]);
};

export default structure;
