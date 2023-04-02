import { appVersion, prodUrl, devUrl } from './main.config';

// https://nuxt.com/modules/robots
export default [
    { UserAgent: '*' },
    { Disallow: '/legal/' },
	{ CrawlDelay: 60 },
    { BlankLine: true },
	{ Host: process.env.NODE_ENV === 'development' ? devUrl : prodUrl },
    { Sitemap: `${process.env.NODE_ENV === 'development' ? devUrl : prodUrl}/${appVersion}/static/sitemap.xml` },
]