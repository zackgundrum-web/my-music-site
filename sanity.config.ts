import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'  // ← Added 'sanity/' prefix

export default defineConfig({
  name: 'default',
  title: 'My Music Site',
  
  projectId: '6n9b95n5',
  dataset: 'production',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})