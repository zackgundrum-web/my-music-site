import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2024-01-01';

// Read-only client for public data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Write client with token for server-side writes
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder for transforming Sanity images
const builder = imageUrlBuilder(client);

// Export a simple helper function
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}