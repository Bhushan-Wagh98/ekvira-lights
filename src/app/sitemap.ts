import { MetadataRoute } from 'next';

/**
 * Sitemap configuration
 * Auto-generates sitemap for all supported locales.
 * Submit this at Google Search Console for indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekviralights.com';

  return [
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/mr`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];
}
