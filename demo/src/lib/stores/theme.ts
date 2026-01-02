import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Theme } from '$lib/types';

const defaultTheme: Theme = 'light';

// Theme background colors for preview areas
export const THEME_COLORS: Record<Theme, string> = {
	light: '#ffffff',
	dark: '#1f2937',
	gray: '#f3f4f6'
};

// Initialize from localStorage if in browser
const initialTheme = browser
	? (localStorage.getItem('theme') as Theme) || defaultTheme
	: defaultTheme;

export const theme = writable<Theme>(initialTheme);

// Subscribe to theme changes and save to localStorage
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
	});
}

export function toggleTheme() {
	theme.update((current) => (current === 'light' ? 'dark' : 'light'));
}
