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
			<p class="text-gray-600 mb-4">Choose from 5 different design styles:</p>
			<ul class="list-disc list-inside space-y-2 text-gray-600 mb-4">
				<li><strong>slider/ios</strong> - Classic iOS-style toggle (default)</li>
				<li><strong>inner</strong> - Toggle with visible ON/OFF text</li>
				<li><strong>modern</strong> - Modern design with optional track icons</li>
				<li><strong>material</strong> - Google Material Design inspired</li>
				<li><strong>multi</strong> - Segmented control with multiple options</li>
			</ul>
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
