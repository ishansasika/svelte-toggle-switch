/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy to clipboard:', err);
		return false;
	}
}

/**
 * Check if clipboard API is available
 */
export function isClipboardAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}
