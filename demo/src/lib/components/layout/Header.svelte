<script lang="ts">
	import { page } from '$app/stores';
	import { toggleSidebar } from '$stores/sidebar';
	import ThemeSwitch from '$components/common/ThemeSwitch.svelte';

	$: currentPath = $page.url.pathname;
</script>

<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<span class="text-2xl">🔘</span>
					<span class="text-xl font-bold text-gray-900">Svelte Toggle Switch</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center space-x-8">
				<a
					href="/"
					class="text-gray-700 hover:text-blue-600 transition-colors"
					class:text-blue-600={currentPath === '/'}
					class:font-semibold={currentPath === '/'}
				>
					Home
				</a>
				<a
					href="/playground"
					class="text-gray-700 hover:text-blue-600 transition-colors"
					class:text-blue-600={currentPath.startsWith('/playground')}
					class:font-semibold={currentPath.startsWith('/playground')}
				>
					Playground
				</a>
				<a
					href="/docs"
					class="text-gray-700 hover:text-blue-600 transition-colors"
					class:text-blue-600={currentPath === '/docs'}
					class:font-semibold={currentPath === '/docs'}
				>
					Docs
				</a>
				<a
					href="https://github.com/ishansasika/svelte-toggle-switch"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-700 hover:text-blue-600 transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://www.npmjs.com/package/svelte-toggle-switch"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-700 hover:text-blue-600 transition-colors"
				>
					npm
				</a>
				<ThemeSwitch />
			</nav>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleSidebar}
				class="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>
