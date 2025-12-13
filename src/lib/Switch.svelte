<script lang="ts">
	// Core Props
	export let value: boolean | string = false;
	export let label: string = '';
	export let design: 'inner' | 'slider' | 'modern' | 'ios' | 'material' | 'multi' = 'slider';

	// Multi-option props (for multi design)
	export let options: string[] = [];

	// Styling Props
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number = 'md';
	export let color: string = '#007AFF';
	export let offColor: string = '#E5E7EB';
	export let colorScheme: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'custom' = 'blue';

	// State Props
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let readonly: boolean = false;

	// Icon Props
	export let showIcons: boolean = false;
	export let onIcon: string = '✓';
	export let offIcon: string = '✕';

	// Animation Props
	export let animationDuration: number = 300;
	export let animationEasing: string = 'ease-in-out';

	// Accessibility Props
	export let ariaLabel: string = '';
	export let ariaDescribedBy: string = '';
	export let id: string = '';

	// Advanced Props
	export let labelPosition: 'left' | 'right' = 'right';
	export let rounded: boolean = true;
	export let shadow: boolean = false;
	export let outline: boolean = false;

	// Internal state
	let checked: boolean = typeof value === 'boolean' ? value : value === 'on';
	const uniqueID = id || `switch-${Math.floor(Math.random() * 1000000)}`;

	// Color schemes
	const colorSchemes = {
		blue: '#007AFF',
		green: '#10B981',
		red: '#EF4444',
		purple: '#8B5CF6',
		orange: '#F97316',
		pink: '#EC4899',
		custom: color
	};

	const activeColor = colorScheme === 'custom' ? color : colorSchemes[colorScheme];

	// Size variants (in rem)
	const sizeMap = {
		xs: 0.75,
		sm: 0.875,
		md: 1,
		lg: 1.25,
		xl: 1.5
	};

	const fontSize = typeof size === 'number' ? size : sizeMap[size];

	// Sync checked state with value prop (one-way: value -> checked)
	$: if (design !== 'multi') {
		const newChecked = typeof value === 'boolean' ? value : value === 'on';
		if (newChecked !== checked) {
			checked = newChecked;
		}
	}

	function handleClick(event: MouseEvent) {
		if (disabled || loading || readonly) {
			event.preventDefault();
			return;
		}

		if (design !== 'multi') {
			const newChecked = !checked;
			checked = newChecked;
			value = newChecked ? (typeof value === 'boolean' ? true : 'on') : (typeof value === 'boolean' ? false : 'off');
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled || loading || readonly) return;

		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			if (design !== 'multi') {
				const newChecked = !checked;
				checked = newChecked;
				value = newChecked ? (typeof value === 'boolean' ? true : 'on') : (typeof value === 'boolean' ? false : 'off');
			}
		}
	}
</script>

{#if design === 'inner'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		style="font-size: {fontSize}rem;"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel || label}
			aria-labelledby={label ? `${uniqueID}-label` : undefined}
			aria-describedby={ariaDescribedBy || undefined}
			{disabled}
			class="switch switch--inner"
			class:checked
			class:loading
			class:rounded
			class:shadow
			class:outline
			on:click={handleClick}
			on:keydown={handleKeyDown}
			style="
				--active-color: {activeColor};
				--off-color: {offColor};
				--animation-duration: {animationDuration}ms;
				--animation-easing: {animationEasing};
			"
		>
			{#if loading}
				<span class="spinner"></span>
			{:else}
				<span class="switch-text">{checked ? 'ON' : 'OFF'}</span>
			{/if}
		</button>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
	</div>

{:else if design === 'slider' || design === 'ios'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		style="font-size: {fontSize}rem;"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel || label}
			aria-labelledby={label ? `${uniqueID}-label` : undefined}
			aria-describedby={ariaDescribedBy || undefined}
			{disabled}
			class="switch switch--slider"
			class:checked
			class:loading
			class:shadow
			class:outline
			on:click={handleClick}
			on:keydown={handleKeyDown}
			style="
				--active-color: {activeColor};
				--off-color: {offColor};
				--animation-duration: {animationDuration}ms;
				--animation-easing: {animationEasing};
			"
		>
			<span class="switch-track">
				<span class="switch-thumb">
					{#if loading}
						<span class="spinner-small"></span>
					{:else if showIcons}
						<span class="switch-icon">{checked ? onIcon : offIcon}</span>
					{/if}
				</span>
			</span>
		</button>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
	</div>

{:else if design === 'modern'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		style="font-size: {fontSize}rem;"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel || label}
			aria-labelledby={label ? `${uniqueID}-label` : undefined}
			aria-describedby={ariaDescribedBy || undefined}
			{disabled}
			class="switch switch--modern"
			class:checked
			class:loading
			class:shadow
			class:outline
			on:click={handleClick}
			on:keydown={handleKeyDown}
			style="
				--active-color: {activeColor};
				--off-color: {offColor};
				--animation-duration: {animationDuration}ms;
				--animation-easing: {animationEasing};
			"
		>
			<span class="switch-track">
				<span class="switch-thumb-modern">
					{#if loading}
						<span class="spinner-small"></span>
					{:else if showIcons}
						<span class="switch-icon-modern">{checked ? onIcon : offIcon}</span>
					{/if}
				</span>
				{#if !loading && showIcons}
					<span class="track-icons">
						<span class="track-icon track-icon--on">{onIcon}</span>
						<span class="track-icon track-icon--off">{offIcon}</span>
					</span>
				{/if}
			</span>
		</button>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
	</div>

{:else if design === 'material'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		style="font-size: {fontSize}rem;"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={ariaLabel || label}
			aria-labelledby={label ? `${uniqueID}-label` : undefined}
			aria-describedby={ariaDescribedBy || undefined}
			{disabled}
			class="switch switch--material"
			class:checked
			class:loading
			class:shadow
			class:outline
			on:click={handleClick}
			on:keydown={handleKeyDown}
			style="
				--active-color: {activeColor};
				--off-color: {offColor};
				--animation-duration: {animationDuration}ms;
				--animation-easing: {animationEasing};
			"
		>
			<span class="switch-track-material">
				<span class="switch-thumb-material">
					{#if loading}
						<span class="spinner-small"></span>
					{/if}
				</span>
			</span>
		</button>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" id="{uniqueID}-label">{label}</span>
		{/if}
	</div>

{:else if design === 'multi'}
	<div
		class="switch-container switch-container--multi"
		class:disabled
		class:readonly
		style="font-size: {fontSize}rem;"
	>
		<div
			role="radiogroup"
			class="switch-multi"
			aria-labelledby="{uniqueID}-legend"
			aria-describedby={ariaDescribedBy || undefined}
			style="
				--active-color: {activeColor};
				--off-color: {offColor};
				--animation-duration: {animationDuration}ms;
				--animation-easing: {animationEasing};
			"
		>
			{#if label}
				<div class="switch-multi-legend" id="{uniqueID}-legend">{label}</div>
			{/if}
			<div class="switch-multi-options" class:shadow class:outline>
				{#each options as option, index}
					<input
						type="radio"
						id="{uniqueID}-{option}"
						value={option}
						bind:group={value}
						{disabled}
						class="switch-multi-input"
					/>
					<label
						for="{uniqueID}-{option}"
						class="switch-multi-label"
						class:first={index === 0}
						class:last={index === options.length - 1}
					>
						{option}
					</label>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	:root {
		--active-color: #007AFF;
		--off-color: #E5E7EB;
		--animation-duration: 300ms;
		--animation-easing: ease-in-out;
	}

	/* Container */
	.switch-container {
		display: inline-flex;
		align-items: center;
		gap: 0.75em;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.switch-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.switch-container.readonly {
		cursor: default;
	}

	.switch-label {
		user-select: none;
		font-size: 1em;
		color: #374151;
	}

	/* Base Switch */
	.switch {
		position: relative;
		border: none;
		cursor: pointer;
		transition: all var(--animation-duration) var(--animation-easing);
		font-family: inherit;
	}

	.switch:disabled {
		cursor: not-allowed;
	}

	.switch:focus-visible {
		outline: 2px solid var(--active-color);
		outline-offset: 2px;
	}

	.switch.shadow {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.switch.outline {
		border: 1px solid #D1D5DB;
	}

	/* Inner Design */
	.switch--inner {
		padding: 0.4em 0.8em;
		background-color: var(--off-color);
		color: #6B7280;
		font-weight: 500;
		font-size: 0.875em;
		min-width: 4em;
		border-radius: 0.25em;
	}

	.switch--inner.rounded {
		border-radius: 0.5em;
	}

	.switch--inner.checked {
		background-color: var(--active-color);
		color: white;
	}

	.switch--inner .switch-text {
		display: block;
		user-select: none;
		pointer-events: none;
	}

	/* Slider/iOS Design */
	.switch--slider {
		padding: 0;
		background: transparent;
		width: 3.5em;
		height: 2em;
	}

	.switch-track {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		background-color: var(--off-color);
		border-radius: 1em;
		transition: background-color var(--animation-duration) var(--animation-easing);
	}

	.switch--slider.checked .switch-track {
		background-color: var(--active-color);
	}

	.switch-thumb {
		position: absolute;
		top: 0.15em;
		left: 0.15em;
		width: 1.7em;
		height: 1.7em;
		background-color: white;
		border-radius: 50%;
		transition: transform var(--animation-duration) var(--animation-easing);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.switch--slider.checked .switch-thumb {
		transform: translateX(1.5em);
	}

	.switch-icon {
		font-size: 0.75em;
		user-select: none;
	}

	/* Modern Design */
	.switch--modern {
		padding: 0;
		background: transparent;
		width: 4em;
		height: 2.2em;
	}

	.switch--modern .switch-track {
		border-radius: 1.1em;
	}

	.switch-thumb-modern {
		position: absolute;
		top: 0.2em;
		left: 0.2em;
		width: 1.8em;
		height: 1.8em;
		background-color: white;
		border-radius: 50%;
		transition: transform var(--animation-duration) var(--animation-easing), background-color var(--animation-duration) var(--animation-easing);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.switch--modern.checked .switch-thumb-modern {
		transform: translateX(1.8em);
	}

	.track-icons {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.5em;
		pointer-events: none;
	}

	.track-icon {
		font-size: 0.7em;
		color: white;
		opacity: 0;
		transition: opacity var(--animation-duration) var(--animation-easing);
	}

	.switch--modern.checked .track-icon--on {
		opacity: 1;
	}

	.switch--modern:not(.checked) .track-icon--off {
		opacity: 0.7;
	}

	.switch-icon-modern {
		font-size: 0.8em;
		user-select: none;
		color: var(--active-color);
	}

	/* Material Design */
	.switch--material {
		padding: 0;
		background: transparent;
		width: 3.5em;
		height: 1.5em;
	}

	.switch-track-material {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		background-color: var(--off-color);
		border-radius: 0.75em;
		transition: background-color var(--animation-duration) var(--animation-easing);
	}

	.switch--material.checked .switch-track-material {
		background-color: var(--active-color);
		opacity: 0.5;
	}

	.switch-thumb-material {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 1.5em;
		height: 1.5em;
		background-color: #FAFAFA;
		border-radius: 50%;
		transition: transform var(--animation-duration) var(--animation-easing), background-color var(--animation-duration) var(--animation-easing);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.switch--material.checked .switch-thumb-material {
		transform: translateY(-50%) translateX(2em);
		background-color: var(--active-color);
	}

	/* Multi Design */
	.switch-container--multi {
		display: block;
	}

	.switch-multi {
		display: inline-block;
	}

	.switch-multi-legend {
		font-size: 0.9em;
		color: #374151;
		margin-bottom: 0.5em;
		font-weight: 500;
	}

	.switch-multi-options {
		display: inline-flex;
		background-color: var(--off-color);
		border-radius: 0.5em;
		padding: 0.25em;
		position: relative;
	}

	.switch-multi-options.shadow {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.switch-multi-options.outline {
		border: 1px solid #D1D5DB;
	}

	.switch-multi-input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.switch-multi-label {
		position: relative;
		padding: 0.5em 1.2em;
		border-radius: 0.375em;
		cursor: pointer;
		user-select: none;
		transition: all var(--animation-duration) var(--animation-easing);
		font-size: 0.875em;
		font-weight: 500;
		color: #6B7280;
		z-index: 1;
	}

	.switch-multi-label.first {
		margin-left: 0;
	}

	.switch-multi-label.last {
		margin-right: 0;
	}

	.switch-multi-input:checked + .switch-multi-label {
		background-color: var(--active-color);
		color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.switch-multi-input:focus-visible + .switch-multi-label {
		outline: 2px solid var(--active-color);
		outline-offset: 2px;
	}

	.switch-multi-input:disabled + .switch-multi-label {
		cursor: not-allowed;
		opacity: 0.5;
	}

	/* Loading Spinner */
	.spinner,
	.spinner-small {
		display: inline-block;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	.spinner {
		width: 1em;
		height: 1em;
	}

	.spinner-small {
		width: 0.8em;
		height: 0.8em;
		border-width: 1.5px;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Hover states */
	.switch:not(:disabled):hover {
		opacity: 0.9;
	}

	.switch-multi-label:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.switch-multi-input:checked + .switch-multi-label:hover {
		background-color: var(--active-color);
		opacity: 0.9;
	}
</style>
