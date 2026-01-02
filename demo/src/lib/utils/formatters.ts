/**
 * Format a camelCase or snake_case string to Title Case
 */
export function toTitleCase(str: string): string {
	return str
		.replace(/([A-Z])/g, ' $1')
		.replace(/_/g, ' ')
		.replace(/^./, (s) => s.toUpperCase())
		.trim();
}

/**
 * Format a number to a readable string with commas
 */
export function formatNumber(num: number): string {
	return num.toLocaleString();
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
	if (str.length <= maxLength) return str;
	return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
