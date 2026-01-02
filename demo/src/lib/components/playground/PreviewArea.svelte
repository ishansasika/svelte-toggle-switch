<script lang="ts">
	import type { ComponentMetadata } from '$lib/types';
	import Switch from '@switch/Switch.svelte';

	export let metadata: ComponentMetadata;
	export let props: Record<string, any>;

	let value: any = props.design === 'multi' && props.options ? props.options[0] : false;

	// Update value when design or options change
	$: if (props.design === 'multi' && props.options && props.options.length > 0) {
		value = props.options[0];
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold">Preview</h3>
	</div>

	<div
		class="p-12 rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[250px] flex items-center justify-center"
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
