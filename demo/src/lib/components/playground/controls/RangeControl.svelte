<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: number;
	export let description: string = '';
	export let min: number = 0;
	export let max: number = 100;
	export let step: number = 1;

	const dispatch = createEventDispatcher();

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		dispatch('change', Number(target.value));
	}
</script>

<div class="control-item p-4 border border-gray-200 rounded-lg bg-white">
	<div class="flex items-center justify-between mb-2">
		<label class="text-sm font-medium text-gray-700">{label}</label>
		<span class="text-sm text-gray-600 font-mono">{value}</span>
	</div>
	<input
		type="range"
		{value}
		{min}
		{max}
		{step}
		on:input={handleInput}
		class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
	/>
	{#if description}
		<p class="text-xs text-gray-500 mt-2">{description}</p>
	{/if}
</div>
