import throwError from '../helpers/throwError';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-21';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? throwError('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? throwError('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');

export const useCdn = process.env.NODE_ENV === 'development';
