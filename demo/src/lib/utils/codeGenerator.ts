/**
 * Generate Svelte code from component name and props
 */
export function generateComponentCode(
	componentName: string,
	props: Record<string, any>,
	options: { hasBindings?: boolean } = {}
): string {
	const propEntries = Object.entries(props)
		.filter(([key, value]) => {
			// Filter out undefined, null, and default values that don't need to be shown
			if (value === undefined || value === null) return false;
			if (key === 'value') return false; // Handled by bind:value
			if (key === 'options' && props.design === 'multi') return false; // Will show separately
			return true;
		})
		.map(([key, value]) => {
			if (typeof value === 'string') {
				return `  ${key}="${value}"`;
			} else if (typeof value === 'number') {
				return `  ${key}={${value}}`;
			} else if (typeof value === 'boolean') {
				return value ? `  ${key}={true}` : `  ${key}={false}`;
			} else if (Array.isArray(value)) {
				return `  ${key}={${JSON.stringify(value)}}`;
			} else {
				return `  ${key}={${JSON.stringify(value)}}`;
			}
		});

	// Add bind:value directive
	if (options.hasBindings !== false) {
		propEntries.unshift('  bind:value');
	}

	const propsString = propEntries.length > 0 ? '\n' + propEntries.join('\n') + '\n' : '';

	return `<${componentName}${propsString}/>`;
}

/**
 * Generate import statement
 */
export function generateImportStatement(
	components: string[],
	source: string = 'svelte-toggle-switch'
): string {
	return `import ${components.join(', ')} from '${source}';`;
}

/**
 * Generate full Svelte component example
 */
export function generateFullExample(
	componentName: string,
	props: Record<string, any>,
	options: Record<string, any> = {}
): string {
	const importStatement = generateImportStatement([componentName]);
	const componentCode = generateComponentCode(componentName, props, options);

	// Determine initial value based on design
	let valueInit = 'false';
	let optionsCode = '';

	if (props.design === 'multi' && props.options) {
		const opts = props.options;
		valueInit = `'${opts[0]}'`;
		optionsCode = `\n  let options = ${JSON.stringify(opts, null, 2)};`;
	}

	return `<script>
  ${importStatement}

  let value = ${valueInit};${optionsCode}
</script>

${componentCode}`;
}

/**
 * Format prop value for display
 */
export function formatPropValue(value: any): string {
	if (typeof value === 'string') {
		return `"${value}"`;
	} else if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	} else if (Array.isArray(value)) {
		return `[${value.map(formatPropValue).join(', ')}]`;
	} else if (typeof value === 'object' && value !== null) {
		return JSON.stringify(value, null, 2);
	}
	return String(value);
}
