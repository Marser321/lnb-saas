import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Hide admin routes from crawlers
        },
        sitemap: 'https://lanuevabrasil.com/sitemap.xml', // Placeholder URL
    };
}
