import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'I Dont Wanna Die Ever Studio',
  
  projectId: '6n9b95n5',
  dataset: 'production',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})