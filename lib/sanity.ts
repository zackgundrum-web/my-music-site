import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Public client for reading
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Server-side client for writing (has auth token)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Only available server-side
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}