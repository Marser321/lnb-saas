import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lanuevabrasil.com'; // Placeholder base URL

    // Core static routes
    const routes = [
        '',
        '/studio',
        '/express',
        '/kitchen-live',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
