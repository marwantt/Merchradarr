import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3p8pla5a',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'merchradar',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

export const clientFetch = client.fetch.bind(client)