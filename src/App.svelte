<script lang="ts">
	import Switch from './lib/Switch.svelte';

	// State variables for different examples
	let basicSwitch = false;
	let colorSwitch = false;
	let sizeSwitch = false;
	let disabledSwitch = false;
	let loadingSwitch = false;
	let iconSwitch = false;
	let multiSwitch = 'Option 1';
	let labelPositionSwitch = true;
	let animationSwitch = false;
	let innerSwitch = false;
	let modernSwitch = false;
	let materialSwitch = false;

	// Color schemes
	let greenSwitch = false;
	let redSwitch = false;
	let purpleSwitch = false;
	let orangeSwitch = false;
	let pinkSwitch = false;

	// Sizes
	let xsSwitch = false;
	let smSwitch = false;
	let mdSwitch = false;
	let lgSwitch = false;
	let xlSwitch = false;
</script>

<main>
	<header>
		<h1>Svelte Toggle Switch</h1>
		<p class="subtitle">A comprehensive, accessible toggle switch component for Svelte</p>
	</header>

	<section>
		<h2>Design Variants</h2>
		<div class="grid">
			<div class="card">
				<h3>Slider (iOS Style)</h3>
				<Switch bind:value={basicSwitch} label="Enable notifications" design="slider" />
				<p class="state">State: {basicSwitch}</p>
			</div>

			<div class="card">
				<h3>Inner</h3>
				<Switch bind:value={innerSwitch} label="Dark mode" design="inner" />
				<p class="state">State: {innerSwitch}</p>
			</div>

			<div class="card">
				<h3>Modern</h3>
				<Switch bind:value={modernSwitch} label="Auto-save" design="modern" />
				<p class="state">State: {modernSwitch}</p>
			</div>

			<div class="card">
				<h3>Material</h3>
				<Switch bind:value={materialSwitch} label="Bluetooth" design="material" />
				<p class="state">State: {materialSwitch}</p>
			</div>
		</div>
	</section>

	<section>
		<h2>Color Schemes</h2>
		<div class="grid">
			<div class="card">
				<h3>Blue (Default)</h3>
				<Switch bind:value={colorSwitch} label="Blue theme" colorScheme="blue" />
			</div>

			<div class="card">
				<h3>Green</h3>
				<Switch bind:value={greenSwitch} label="Green theme" colorScheme="green" />
			</div>

			<div class="card">
				<h3>Red</h3>
				<Switch bind:value={redSwitch} label="Red theme" colorScheme="red" />
			</div>

			<div class="card">
				<h3>Purple</h3>
				<Switch bind:value={purpleSwitch} label="Purple theme" colorScheme="purple" />
			</div>

			<div class="card">
				<h3>Orange</h3>
				<Switch bind:value={orangeSwitch} label="Orange theme" colorScheme="orange" />
			</div>

			<div class="card">
				<h3>Pink</h3>
				<Switch bind:value={pinkSwitch} label="Pink theme" colorScheme="pink" />
			</div>
		</div>
	</section>

	<section>
		<h2>Size Variants</h2>
		<div class="grid">
			<div class="card">
				<h3>Extra Small</h3>
				<Switch bind:value={xsSwitch} label="XS Size" size="xs" />
			</div>

			<div class="card">
				<h3>Small</h3>
				<Switch bind:value={smSwitch} label="Small Size" size="sm" />
			</div>

			<div class="card">
				<h3>Medium (Default)</h3>
				<Switch bind:value={mdSwitch} label="Medium Size" size="md" />
			</div>

			<div class="card">
				<h3>Large</h3>
				<Switch bind:value={lgSwitch} label="Large Size" size="lg" />
			</div>

			<div class="card">
				<h3>Extra Large</h3>
				<Switch bind:value={xlSwitch} label="XL Size" size="xl" />
			</div>
		</div>
	</section>

	<section>
		<h2>States</h2>
		<div class="grid">
			<div class="card">
				<h3>Disabled</h3>
				<Switch bind:value={disabledSwitch} label="Disabled switch" disabled />
			</div>

			<div class="card">
				<h3>Loading</h3>
				<Switch bind:value={loadingSwitch} label="Loading state" loading />
			</div>

			<div class="card">
				<h3>Read-only</h3>
				<Switch bind:value={disabledSwitch} label="Read-only switch" readonly />
			</div>
		</div>
	</section>

	<section>
		<h2>Icon Support</h2>
		<div class="grid">
			<div class="card">
				<h3>Slider with Icons</h3>
				<Switch
					bind:value={iconSwitch}
					label="Wi-Fi"
					design="slider"
					showIcons={true}
					onIcon="✓"
					offIcon="✕"
				/>
			</div>

			<div class="card">
				<h3>Modern with Custom Icons</h3>
				<Switch
					bind:value={iconSwitch}
					label="Airplane Mode"
					design="modern"
					showIcons={true}
					onIcon="✈"
					offIcon="✕"
					colorScheme="purple"
				/>
			</div>

			<div class="card">
				<h3>Custom Emoji Icons</h3>
				<Switch
					bind:value={iconSwitch}
					label="Theme"
					design="slider"
					showIcons={true}
					onIcon="🌙"
					offIcon="☀"
					colorScheme="orange"
					size="lg"
				/>
			</div>
		</div>
	</section>

	<section>
		<h2>Multi-option Switch</h2>
		<div class="card">
			<h3>Toggle Group</h3>
			<Switch
				bind:value={multiSwitch}
				label="Select an option"
				design="multi"
				options={['Option 1', 'Option 2', 'Option 3']}
			/>
			<p class="state">Selected: {multiSwitch}</p>
		</div>

		<div class="card">
			<h3>View Mode Selector</h3>
			<Switch
				bind:value={multiSwitch}
				label="View"
				design="multi"
				options={['Grid', 'List']}
				size="sm"
				colorScheme="green"
			/>
		</div>
	</section>

	<section>
		<h2>Advanced Features</h2>
		<div class="grid">
			<div class="card">
				<h3>Label Position</h3>
				<Switch
					bind:value={labelPositionSwitch}
					label="Label on left"
					labelPosition="left"
				/>
			</div>

			<div class="card">
				<h3>With Shadow</h3>
				<Switch bind:value={sizeSwitch} label="Shadow effect" shadow />
			</div>

			<div class="card">
				<h3>With Outline</h3>
				<Switch bind:value={sizeSwitch} label="Outline style" outline />
			</div>

			<div class="card">
				<h3>Custom Animation</h3>
				<Switch
					bind:value={animationSwitch}
					label="Slow animation"
					animationDuration={800}
					animationEasing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
					colorScheme="pink"
				/>
			</div>

			<div class="card">
				<h3>Custom Colors</h3>
				<Switch
					bind:value={animationSwitch}
					label="Custom palette"
					colorScheme="custom"
					color="#FF6B6B"
					offColor="#F0F0F0"
				/>
			</div>
		</div>
	</section>

	<footer>
		<p>Built with Svelte • TypeScript • Vite</p>
		<p>
			<a href="https://github.com/ishansasika/svelte-toggle-switch" target="_blank" rel="noopener">
				View on GitHub
			</a>
		</p>
	</footer>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		line-height: 1.6;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	header {
		text-align: center;
		margin-bottom: 3rem;
		color: white;
	}

	h1 {
		font-size: 3rem;
		margin: 0;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.subtitle {
		font-size: 1.25rem;
		opacity: 0.9;
		margin-top: 0.5rem;
	}

	section {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 2rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin-top: 0;
		color: #1f2937;
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	h3 {
		color: #4b5563;
		font-size: 1rem;
		margin-top: 0;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.card {
		background: #f9fafb;
		padding: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid #e5e7eb;
		transition: all 0.3s ease;
	}

	.card:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		transform: translateY(-2px);
	}

	.state {
		margin-top: 1rem;
		padding: 0.5rem;
		background: white;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		color: #6b7280;
		font-family: 'Courier New', monospace;
	}

	footer {
		text-align: center;
		color: white;
		padding: 2rem 0;
		margin-top: 2rem;
	}

	footer p {
		margin: 0.5rem 0;
	}

	footer a {
		color: white;
		text-decoration: underline;
	}

	footer a:hover {
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1rem;
		}

		section {
			padding: 1.5rem;
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
