<script lang="ts">
	import { page } from '$app/stores';
	import { closeSidebar } from '$stores/sidebar';
	import ThemeSwitch from '$components/common/ThemeSwitch.svelte';

	$: currentPath = $page.url.pathname;

	function handleLinkClick() {
		closeSidebar();
	}
</script>

<!-- Mobile Menu Overlay -->
<div
	class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
	on:click={closeSidebar}
	on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
	role="button"
	tabindex="0"
	aria-label="Close menu"
></div>

<!-- Mobile Menu Sidebar -->
<div class="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 md:hidden">
	<!-- Close Button -->
	<div class="flex justify-end p-4">
		<button
			on:click={closeSidebar}
			class="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
			aria-label="Close menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>

	<!-- Navigation Links -->
	<nav class="px-4 py-2 space-y-1">
		<a
			href="/"
			on:click={handleLinkClick}
			class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
			class:bg-blue-50={currentPath === '/'}
			class:text-blue-600={currentPath === '/'}
			class:font-semibold={currentPath === '/'}
		>
			Home
		</a>
		<a
			href="/playground"
			on:click={handleLinkClick}
			class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
			class:bg-blue-50={currentPath.startsWith('/playground')}
			class:text-blue-600={currentPath.startsWith('/playground')}
			class:font-semibold={currentPath.startsWith('/playground')}
		>
			Playground
		</a>
		<a
			href="/docs"
			on:click={handleLinkClick}
			class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
			class:bg-blue-50={currentPath === '/docs'}
			class:text-blue-600={currentPath === '/docs'}
			class:font-semibold={currentPath === '/docs'}
		>
			Docs
		</a>
		<a
			href="https://github.com/ishansasika/svelte-toggle-switch"
			target="_blank"
			rel="noopener noreferrer"
			class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
		>
			GitHub
		</a>
		<a
			href="https://www.npmjs.com/package/svelte-toggle-switch"
			target="_blank"
			rel="noopener noreferrer"
			class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
		>
			npm
		</a>

		<!-- Theme Switch -->
		<div class="pt-4 px-4">
			<ThemeSwitch />
		</div>
	</nav>
</div>
