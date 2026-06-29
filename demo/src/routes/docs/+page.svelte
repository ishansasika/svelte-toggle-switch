<script lang="ts">
	import { SWITCH_METADATA } from '$data/componentMetadata';
	import CodeBlock from '$components/common/CodeBlock.svelte';

	const installCode = `npm install svelte-toggle-switch`;

	const basicExample = `<script${'>'}\n  import Switch from 'svelte-toggle-switch';\n\n  let value = false;\n</${'script'}>\n\n<Switch bind:value label="Enable notifications" />`;

	const multiExample = `<script${'>'}\n  import Switch from 'svelte-toggle-switch';\n\n  let value = 'Option 1';\n  let options = ['Option 1', 'Option 2', 'Option 3'];\n</${'script'}>\n\n<Switch\n  bind:value\n  {options}\n  design="multi"\n  label="Choose option"\n/>`;

	const customExample = `<script${'>'}\n  import Switch from 'svelte-toggle-switch';\n\n  let value = false;\n</${'script'}>\n\n<Switch\n  bind:value\n  label="Dark mode"\n  design="modern"\n  colorScheme="purple"\n  size="lg"\n  showIcons={true}\n  onIcon="🌙"\n  offIcon="☀️"\n  shadow={true}\n  animationDuration={500}\n/>`;
</script>

<svelte:head>
	<title>Documentation - Svelte Toggle Switch</title>
	<meta
		name="description"
		content="Complete documentation for Svelte Toggle Switch component"
	/>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="space-y-12">
		<!-- Header -->
		<div>
			<h1 class="text-4xl font-bold mb-4">Documentation</h1>
			<p class="text-lg text-gray-600">
				Complete guide to using Svelte Toggle Switch in your applications
			</p>
		</div>

		<!-- Installation -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Installation</h2>
			<CodeBlock code={installCode} language="bash" />
		</section>

		<!-- Basic Usage -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Basic Usage</h2>
			<p class="text-gray-600 mb-4">
				The simplest way to use the toggle switch component. Just bind a value and optionally add
				a label.
			</p>
			<CodeBlock code={basicExample} language="svelte" />
		</section>

		<!-- Design Variants -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Design Variants</h2>
			<p class="text-gray-600 mb-4">Choose from 8 different design styles:</p>
			<ul class="list-disc list-inside space-y-2 text-gray-600 mb-4">
				<li><strong>slider/ios</strong> - Classic iOS-style toggle (default)</li>
				<li><strong>inner</strong> - Toggle with visible ON/OFF text</li>
				<li><strong>modern</strong> - Modern design with optional track icons</li>
				<li><strong>material</strong> - Google Material Design inspired</li>
				<li><strong>multi</strong> - Segmented control with multiple options</li>
				<li><strong>neon</strong> <span class="text-purple-600 text-xs font-semibold">v3.0.0</span> - Cyberpunk glow with color-matched neon bloom</li>
				<li><strong>flip</strong> <span class="text-purple-600 text-xs font-semibold">v3.0.0</span> - 3D card that rotates 180° on toggle (<code class="bg-gray-100 px-1 rounded">flipFrontContent</code>, <code class="bg-gray-100 px-1 rounded">flipBackContent</code>)</li>
				<li><strong>pill</strong> <span class="text-purple-600 text-xs font-semibold">v3.0.0</span> - Binary segmented control as connected pill buttons</li>
			</ul>
		</section>

		<!-- v3.0.0 Interaction Features -->
		<section>
			<h2 class="text-2xl font-bold mb-4">v3.0.0 Interaction Features</h2>
			<div class="space-y-4">
				<div class="bg-gray-50 rounded-lg p-4">
					<h3 class="font-semibold text-gray-800 mb-1">Drag Momentum <code class="text-purple-600 text-sm">dragMomentum</code></h3>
					<p class="text-gray-600 text-sm">Thumb follows the pointer during drag. On release, snaps based on velocity (&gt;0.3px/ms) or distance (&gt;20px).</p>
				</div>
				<div class="bg-gray-50 rounded-lg p-4">
					<h3 class="font-semibold text-gray-800 mb-1">Long Press <code class="text-purple-600 text-sm">longPress</code> <code class="text-purple-600 text-sm">longPressDuration</code></h3>
					<p class="text-gray-600 text-sm">Hold to toggle with an animated SVG progress ring. Fires after <code>longPressDuration</code> ms (default 600). Releasing early cancels.</p>
				</div>
				<div class="bg-gray-50 rounded-lg p-4">
					<h3 class="font-semibold text-gray-800 mb-1">Confirm Toggle <code class="text-purple-600 text-sm">confirmToggle</code> <code class="text-purple-600 text-sm">onconfirm</code></h3>
					<p class="text-gray-600 text-sm">Requires confirmation before toggling. Pass an async <code>onconfirm</code> callback returning <code>Promise&lt;boolean&gt;</code>, or use the built-in inline Yes/No prompt via <code>confirmMessage</code>.</p>
				</div>
			</div>
		</section>

		<!-- Migration Guide -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Migrating from v2 to v3</h2>
			<div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
				<p class="font-semibold text-amber-800 mb-2">One breaking change: event syntax</p>
				<p class="text-amber-700 text-sm mb-3">Update all event handlers — prop names and defaults are unchanged.</p>
				<div class="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
					<pre>{`<!-- v2.x -->\n<Switch on:change={handler} on:focus={onFocus} on:blur={onBlur} />\n\n<!-- v3.0 -->\n<Switch onchange={handler} onfocus={onFocus} onblur={onBlur} />`}</pre>
				</div>
			</div>
		</section>

		<!-- Multi-Option Example -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Multi-Option Mode</h2>
			<p class="text-gray-600 mb-4">
				Create segmented controls with multiple options using the <code
					class="bg-gray-100 px-2 py-1 rounded">multi</code
				> design.
			</p>
			<CodeBlock code={multiExample} language="svelte" />
		</section>

		<!-- Customization -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Customization</h2>
			<p class="text-gray-600 mb-4">Extensive customization options available:</p>
			<CodeBlock code={customExample} language="svelte" />
		</section>

		<!-- Props Table -->
		<section id="api">
			<h2 class="text-2xl font-bold mb-4">API Reference</h2>
			<div class="overflow-x-auto">
				<table class="min-w-full bg-white border border-gray-200 rounded-lg">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Prop</th>
							<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Type</th>
							<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
								>Default</th
							>
							<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
								>Description</th
							>
						</tr>
					</thead>
					<tbody>
						{#each SWITCH_METADATA.propDefinitions as prop}
							<tr class="border-b border-gray-200 hover:bg-gray-50">
								<td class="px-4 py-3 text-sm font-mono text-blue-600">{prop.name}</td>
								<td class="px-4 py-3 text-sm font-mono text-gray-600">{prop.type}</td>
								<td class="px-4 py-3 text-sm font-mono text-gray-600"
									>{JSON.stringify(prop.defaultValue)}</td
								>
								<td class="px-4 py-3 text-sm text-gray-600">{prop.description}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<!-- Accessibility -->
		<section>
			<h2 class="text-2xl font-bold mb-4">Accessibility</h2>
			<p class="text-gray-600 mb-4">
				The component is built with accessibility in mind and includes:
			</p>
			<ul class="list-disc list-inside space-y-2 text-gray-600">
				<li>ARIA roles and attributes (role="switch", aria-checked, etc.)</li>
				<li>Keyboard navigation (Space and Enter keys)</li>
				<li>Screen reader support with proper labels</li>
				<li>Focus indicators for keyboard navigation</li>
				<li>Disabled and readonly states properly communicated</li>
			</ul>
		</section>

		<!-- License -->
		<section>
			<h2 class="text-2xl font-bold mb-4">License</h2>
			<p class="text-gray-600">
				Svelte Toggle Switch is open source software licensed under the MIT license.
			</p>
		</section>
	</div>
</div>
