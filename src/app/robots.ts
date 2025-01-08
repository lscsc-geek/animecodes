import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/search',
      ]
    },
    sitemap: 'https://animecodes.com/sitemap.xml',
    host: 'https://animecodes.com',
  }
} 