<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-900 text-gray-300 py-12 mt-auto">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- About -->
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center space-x-2 mb-4">
					<span class="text-2xl">🔘</span>
					<span class="text-xl font-bold text-white">Svelte Toggle Switch</span>
				</div>
				<p class="text-sm text-gray-400 max-w-md">
					A comprehensive, accessible toggle switch component for Svelte with multiple design
					variants, color themes, and extensive customization options.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h3 class="text-white font-semibold mb-4">Documentation</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/docs" class="hover:text-white transition-colors">Getting Started</a>
					</li>
					<li>
						<a href="/playground" class="hover:text-white transition-colors">Playground</a>
					</li>
					<li>
						<a href="/docs#api" class="hover:text-white transition-colors">API Reference</a>
					</li>
					<li>
						<a href="/docs#examples" class="hover:text-white transition-colors">Examples</a>
					</li>
				</ul>
			</div>

			<!-- Resources -->
			<div>
				<h3 class="text-white font-semibold mb-4">Resources</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<a
							href="https://github.com/ishansasika/svelte-toggle-switch"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-white transition-colors"
						>
							GitHub
						</a>
					</li>
					<li>
						<a
							href="https://www.npmjs.com/package/svelte-toggle-switch"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-white transition-colors"
						>
							npm Package
						</a>
					</li>
					<li>
						<a
							href="https://github.com/ishansasika/svelte-toggle-switch/issues"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-white transition-colors"
						>
							Report Issue
						</a>
					</li>
					<li>
						<a
							href="https://ishansasika.dev"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-white transition-colors"
						>
							Author
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
			<p>
				© {currentYear} Svelte Toggle Switch. Created by
				<a
					href="https://ishansasika.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300"
				>
					Ishan Karunaratne
				</a>. MIT License.
			</p>
		</div>
	</div>
</footer>
