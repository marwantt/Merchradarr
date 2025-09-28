import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'MerchRadar Blog',

  projectId: '3p8pla5a',
  dataset: 'merchradar',

  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  vite: {
    css: {
      postcss: false
    }
  }

})