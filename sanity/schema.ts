import { type SchemaTypeDefinition } from 'sanity';
import kiosk from './schemas/documents/kiosk';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [kiosk]
};
