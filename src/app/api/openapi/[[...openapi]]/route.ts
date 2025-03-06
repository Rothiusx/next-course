import { OpenAPI } from '@scalar/nextjs-openapi'

export const { GET } = OpenAPI({
  apiDirectory: 'src/app/api',
  baseServerURL: 'http://localhost:3000',
  proxyUrl: 'http://localhost:3000/api/openapi',
})
