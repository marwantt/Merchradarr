import { groq } from 'next-sanity'

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    publishedAt,
    readingTime,
    featured,
    metaTitle,
    metaDescription
  }
`

export const featuredPostQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    publishedAt,
    readingTime,
    metaTitle,
    metaDescription
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    content,
    publishedAt,
    readingTime,
    metaTitle,
    metaDescription
  }
`

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`