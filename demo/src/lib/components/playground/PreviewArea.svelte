<script lang="ts">
	import type { ComponentMetadata } from '$lib/types';
	import Switch from '@switch/Switch.svelte';
	import ThemeSwitch from '$components/common/ThemeSwitch.svelte';
	import { theme, THEME_COLORS } from '$stores/theme';

	export let metadata: ComponentMetadata;
	export let props: Record<string, any>;

	let value: any = props.design === 'multi' && props.options ? props.options[0] : false;

	// Update value when design or options change
	$: if (props.design === 'multi' && props.options && props.options.length > 0) {
		value = props.options[0];
	}

	// Compute background color based on theme
	$: backgroundColor = THEME_COLORS[$theme];
</script>

<div class="space-y-4">
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
		<h3 class="text-lg font-semibold">Preview</h3>
		<ThemeSwitch />
	</div>

	<div
		class="p-12 rounded-lg border-2 border-gray-200 min-h-[250px] flex items-center justify-center transition-colors duration-300"
		style="background-color: {backgroundColor};"
	>
		<div class="flex items-center justify-center">
			<Switch bind:value {...props} />
		</div>
	</div>

	<div class="text-sm text-gray-600">
		<strong>Current value:</strong>
		<code class="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">{JSON.stringify(value)}</code>
	</div>
</div>
