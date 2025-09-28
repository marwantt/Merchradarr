import { createClient } from 'next-sanity'

// Sanity project configuration
const projectId = '3p8pla5a' // Your project ID from sanity.config.ts
const dataset = 'merchradar' // Your dataset from sanity.config.ts
const apiVersion = '2024-01-01' // Use current date

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// GROQ queries for fetching data
export const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "author": author->{name, slug, image},
  "category": category->{title, slug, color},
  featuredImage,
  publishedAt,
  readingTime,
  featured,
  metaTitle,
  metaDescription
}`

export const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  "author": author->{name, slug, image, bio},
  "category": category->{title, slug, color},
  featuredImage,
  publishedAt,
  readingTime,
  featured,
  metaTitle,
  metaDescription
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color,
  featured
}`

export const AUTHORS_QUERY = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio,
  expertise,
  socialLinks
}`