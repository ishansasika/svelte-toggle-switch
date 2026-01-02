<script lang="ts">
	import Switch from '@switch/Switch.svelte';

	let demoValue = false;

	const features = [
		{
			icon: '🎨',
			title: '5 Design Variants',
			description: 'Slider/iOS, Inner text, Modern, Material, Multi-option designs'
		},
		{
			icon: '🌈',
			title: '6 Color Schemes',
			description: 'Beautiful pre-built themes: blue, green, red, purple, orange, pink'
		},
		{
			icon: '📏',
			title: '5 Size Options',
			description: 'From XS to XL, or custom sizes for perfect fit'
		},
		{
			icon: '🎭',
			title: 'Custom Icons',
			description: 'Use any emoji or text as on/off icons'
		},
		{
			icon: '⚙️',
			title: 'Highly Customizable',
			description: 'Colors, animations, shadows, outlines, and more'
		},
		{
			icon: '♿',
			title: 'Fully Accessible',
			description: 'ARIA labels, keyboard navigation, screen reader support'
		},
		{
			icon: '📱',
			title: 'Multi-Option Mode',
			description: 'Segmented control with multiple choices'
		},
		{
			icon: '🎯',
			title: 'TypeScript First',
			description: 'Full TypeScript support with type definitions'
		}
	];
</script>

<svelte:head>
	<title>Svelte Toggle Switch - Modern Toggle Component</title>
	<meta
		name="description"
		content="A comprehensive, accessible toggle switch component for Svelte with multiple design variants, themes, and customization options"
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h1 class="text-4xl md:text-5xl font-bold mb-6">Svelte Toggle Switch</h1>
		<p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
			A comprehensive, accessible toggle switch component for Svelte applications. Five design
			variants, six color themes, and extensive customization options.
		</p>

		<!-- Live Demo -->
		<div class="max-w-md mx-auto bg-white rounded-lg p-8 shadow-xl">
			<Switch bind:value={demoValue} label="Try me out" colorScheme="purple" size="lg" />
		</div>

		<div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
			<a
				href="/playground"
				class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
			>
				Try Playground
			</a>
			<a
				href="/docs"
				class="px-6 py-3 bg-blue-500 hover:bg-blue-400 font-semibold rounded-lg transition-colors"
			>
				Documentation
			</a>
		</div>
	</div>
</section>

<!-- Features Grid -->
<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-center mb-12">Features</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature}
				<div
					class="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
				>
					<div class="text-4xl mb-4">{feature.icon}</div>
					<h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
					<p class="text-gray-600 text-sm">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Installation Section -->
<section class="py-20 bg-gray-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-bold text-center mb-8">Quick Start</h2>

		<div class="space-y-8">
			<div>
				<h3 class="text-xl font-semibold mb-4">Installation</h3>
				<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
					<code class="text-sm">npm install svelte-toggle-switch</code>
				</div>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4">Basic Usage</h3>
				<div class="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
					<pre class="text-sm">{`<script${'>'}\n  import Switch from 'svelte-toggle-switch';\n\n  let value = false;\n</${'script'}>\n\n<Switch bind:value label="Enable notifications" />`}</pre>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-blue-600 text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl font-bold mb-6">Ready to get started?</h2>
		<p class="text-xl mb-8">Explore the playground and see all features in action</p>
		<a
			href="/playground"
			class="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
		>
			Open Playground
		</a>
	</div>
</section>
