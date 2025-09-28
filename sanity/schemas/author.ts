import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Brief biography for author pages',
      validation: (Rule) => Rule.max(500)
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise Areas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Amazon Merch on Demand', value: 'merch-on-demand'},
          {title: 'Print on Demand', value: 'print-on-demand'},
          {title: 'E-commerce', value: 'ecommerce'},
          {title: 'Digital Marketing', value: 'digital-marketing'},
          {title: 'Design', value: 'design'},
          {title: 'SEO', value: 'seo'},
          {title: 'Amazon FBA', value: 'amazon-fba'},
        ],
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})