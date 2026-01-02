import type { SEOConfig } from '$lib/types';

/**
 * Default SEO configuration
 */
export const defaultSEO: SEOConfig = {
	title: 'Svelte Toggle Switch - Modern Toggle Component',
	description:
		'A comprehensive, accessible toggle switch component for Svelte with multiple design variants, themes, and customization options',
	url: 'https://svelte-toggle-switch.ishansasika.dev',
	type: 'website',
	keywords: [
		'svelte',
		'toggle',
		'switch',
		'component',
		'ui',
		'accessible',
		'typescript',
		'multi-design'
	]
};

/**
 * Merge SEO config with defaults
 */
export function mergeSEO(config: Partial<SEOConfig>): SEOConfig {
	return {
		...defaultSEO,
		...config
	};
}
