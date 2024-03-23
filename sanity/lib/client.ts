import type { SanityValues } from '../../sanity.config';

// import { createClient } from "@sanity/client";
import { createClient } from '@sanity-typed/client';

import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient<SanityValues>({
	apiVersion,
	dataset,
	projectId,
	useCdn
});
