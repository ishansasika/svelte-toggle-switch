<script lang="ts">
	import Switch from '@switch/Switch.svelte';

	let demoValue = $state(false);
	let neonDemo = $state(false);
	let flipDemo = $state(false);
	let pillDemo = $state(false);

	const features = [
		{
			icon: '🎨',
			title: '8 Design Variants',
			description: 'Slider/iOS, Inner, Modern, Material, Multi, Neon, Flip, Pill'
		},
		{
			icon: '🌈',
			title: '9 Color Schemes',
			description: 'Blue, green, red, purple, orange, pink, yellow, indigo, teal + custom'
		},
		{
			icon: '📏',
			title: '5 Size Options',
			description: 'From XS to XL, or custom sizes for perfect fit'
		},
		{
			icon: '🌙',
			title: 'Dark Mode + Gradients',
			description: 'Auto dark mode detection, 5 gradient presets, RTL support'
		},
		{
			icon: '📱',
			title: 'Touch & Drag',
			description: 'Swipe-to-toggle, drag momentum, haptic feedback'
		},
		{
			icon: '🔒',
			title: 'Confirm to Toggle',
			description: 'Async confirmation callback or inline Yes/No prompt'
		},
		{
			icon: '⏳',
			title: 'Long Press',
			description: 'Animated progress ring — prevents accidental toggles'
		},
		{
			icon: '♿',
			title: 'Fully Accessible',
			description: 'ARIA labels, keyboard navigation, screen reader support'
		},
		{
			icon: '🎯',
			title: 'TypeScript First',
			description: 'Full SwitchProps type + Svelte 5 runes throughout'
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
			A comprehensive, accessible toggle switch component for Svelte applications. Eight design
			variants, nine color themes, Svelte 5 runes, and powerful interaction modes.
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

<!-- v3.0.0 New Variants Showcase -->
<section class="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<span class="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">v3.0.0</span>
			<h2 class="text-3xl font-bold text-white mb-4">3 New Design Variants</h2>
			<p class="text-gray-400 max-w-2xl mx-auto">Neon glow, 3D card flip, and binary pill button — all with the same powerful API.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
				<h3 class="text-white font-semibold mb-6">Neon</h3>
				<div class="flex justify-center mb-4">
					<Switch design="neon" colorScheme="blue" bind:value={neonDemo} darkMode={true} />
				</div>
				<p class="text-gray-400 text-sm mb-2">Cyberpunk glow with color-matched bloom</p>
				<code class="text-purple-400 text-xs">design="neon"</code>
			</div>
			<div class="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
				<h3 class="text-white font-semibold mb-6">Flip</h3>
				<div class="flex justify-center mb-4">
					<Switch design="flip" colorScheme="green" bind:value={flipDemo} />
				</div>
				<p class="text-gray-400 text-sm mb-2">3D card flip with custom face content</p>
				<code class="text-purple-400 text-xs">design="flip"</code>
			</div>
			<div class="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
				<h3 class="text-white font-semibold mb-6">Pill</h3>
				<div class="flex justify-center mb-4">
					<Switch design="pill" colorScheme="purple" bind:value={pillDemo} />
				</div>
				<p class="text-gray-400 text-sm mb-2">Binary segmented control with pill buttons</p>
				<code class="text-purple-400 text-xs">design="pill"</code>
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
