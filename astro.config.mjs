// @ts-check
import { defineConfig } from 'astro/config';

// The live address, for the sharing image's full URL (og:image needs one).
// Set SITE_URL in Cloudflare's build settings, or write the address here once the site is online,
// for example: site: 'https://kinton.example.workers.dev'
const site = process.env.SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({ site });
