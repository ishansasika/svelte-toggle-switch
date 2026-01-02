import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			'$lib': './src/lib',
			'$components': './src/lib/components',
			'$data': './src/lib/data',
			'$utils': './src/lib/utils',
			'$stores': './src/lib/stores',
			'@switch': '../src/lib'
		},
		prerender: {
			entries: [
				'*',
				'/playground/switch'
			],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404 for og-image.png
				if (path === '/og-image.png') {
					return;
				}
				throw new Error(message);
			},
			handleMissingId: () => {
				// Ignore missing ID warnings
			}
		}
	}
};

export default config;
