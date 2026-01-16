<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

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
	export let colorScheme: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'yellow' | 'indigo' | 'teal' | 'custom' = 'blue';

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
	export let name: string = '';
	export let tabIndex: number = 0;

	// Advanced Props
	export let labelPosition: 'left' | 'right' = 'right';
	export let rounded: boolean = true;
	export let shadow: boolean = false;
	export let outline: boolean = false;

	// v2.1.0 New Features
	// Custom Text Labels
	export let onText: string = 'ON';
	export let offText: string = 'OFF';

	// Form Validation
	export let helperText: string = '';
	export let errorText: string = '';
	export let required: boolean = false;
	export let error: boolean = false;

	// v2.2.0 New Features
	// Dark Mode
	export let darkMode: boolean | 'auto' = false;

	// Gradient Colors
	export let gradient: boolean = false;
	export let gradientPreset: 'sunset' | 'ocean' | 'forest' | 'berry' | 'fire' | 'custom' = 'sunset';
	export let customGradient: string = '';

	// Touch Gestures
	export let swipeToToggle: boolean = false;
	export let swipeThreshold: number = 50;

	// RTL Support
	export let dir: 'ltr' | 'rtl' | 'auto' = 'auto';

	// v2.3.0 New Features
	// Pulse Animation
	export let pulse: boolean = false;
	export let pulseColor: string = '';
	export let pulseIntensity: 'subtle' | 'normal' | 'strong' = 'normal';

	// Success/Error Animations
	export let showSuccessAnimation: boolean = false;
	export let showErrorAnimation: boolean = false;
	export let successDuration: number = 1500;

	// Haptic Feedback
	export let hapticFeedback: boolean = false;
	export let hapticPattern: 'light' | 'medium' | 'heavy' | number[] = 'light';

	// Skeleton Loading State
	export let skeleton: boolean = false;
	export let skeletonAnimation: 'shimmer' | 'pulse' | 'wave' = 'shimmer';

	// Tooltip Support
	export let tooltip: string = '';
	export let tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
	export let tooltipDelay: number = 300;

	// Internal state
	let checked: boolean = typeof value === 'boolean' ? value : value === 'on';
	const uniqueID = id || `switch-${Math.floor(Math.random() * 1000000)}`;

	// v2.2.0 - Dark mode detection
	let isDarkMode = false;
	if (typeof window !== 'undefined') {
		if (darkMode === 'auto') {
			isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			// Listen for changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				isDarkMode = e.matches;
			});
		} else {
			isDarkMode = darkMode === true;
		}
	}

	// v2.2.0 - Gradient presets
	const gradientPresets = {
		sunset: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
		ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		forest: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
		berry: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
		fire: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
		custom: customGradient
	};

	// v2.2.0 - Touch gesture state
	let touchStartX = 0;
	let touchCurrentX = 0;
	let isDragging = false;
	let dragOffset = 0;

	// v2.3.0 - Animation states
	let showSuccess = false;
	let showError = false;
	let isTooltipVisible = false;
	let tooltipTimeoutId: ReturnType<typeof setTimeout> | null = null;

	// v2.3.0 - Pulse intensity values
	const pulseIntensityMap = {
		subtle: { scale: 1.02, opacity: 0.3 },
		normal: { scale: 1.05, opacity: 0.5 },
		strong: { scale: 1.1, opacity: 0.7 }
	};

	// v2.3.0 - Haptic patterns (in ms)
	const hapticPatterns = {
		light: [10],
		medium: [20],
		heavy: [30, 10, 30]
	};

	// v2.3.0 - Trigger haptic feedback
	function triggerHaptic() {
		if (!hapticFeedback || typeof navigator === 'undefined' || !navigator.vibrate) return;

		const pattern = typeof hapticPattern === 'object'
			? hapticPattern
			: hapticPatterns[hapticPattern];

		try {
			navigator.vibrate(pattern);
		} catch (e) {
			// Vibration not supported or permission denied
		}
	}

	// v2.3.0 - Trigger success animation
	function triggerSuccessAnimation() {
		if (!showSuccessAnimation) return;
		showSuccess = true;
		setTimeout(() => {
			showSuccess = false;
		}, successDuration);
	}

	// v2.3.0 - Trigger error animation
	function triggerErrorAnimation() {
		if (!showErrorAnimation) return;
		showError = true;
		setTimeout(() => {
			showError = false;
		}, 500);
	}

	// v2.3.0 - Tooltip handlers
	function handleMouseEnter() {
		if (!tooltip) return;
		tooltipTimeoutId = setTimeout(() => {
			isTooltipVisible = true;
		}, tooltipDelay);
	}

	function handleMouseLeave() {
		if (tooltipTimeoutId) {
			clearTimeout(tooltipTimeoutId);
			tooltipTimeoutId = null;
		}
		isTooltipVisible = false;
	}

	// v2.2.0 - RTL detection
	let isRTL = false;
	if (typeof document !== 'undefined') {
		if (dir === 'auto') {
			isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';
		} else {
			isRTL = dir === 'rtl';
		}
	}

	// Color schemes (v2.1.0 - added yellow, indigo, teal)
	const colorSchemes = {
		blue: '#007AFF',
		green: '#10B981',
		red: '#EF4444',
		purple: '#8B5CF6',
		orange: '#F97316',
		pink: '#EC4899',
		yellow: '#F59E0B',
		indigo: '#6366F1',
		teal: '#14B8A6',
		custom: color
	};

	// v2.2.0 - Dark mode color variants
	const darkColorSchemes = {
		blue: '#0A84FF',
		green: '#30D158',
		red: '#FF453A',
		purple: '#BF5AF2',
		orange: '#FF9F0A',
		pink: '#FF375F',
		yellow: '#FFD60A',
		indigo: '#5E5CE6',
		teal: '#40C8E0',
		custom: color
	};

	// v2.2.0 - Determine active color (dark mode aware)
	$: activeColor = (() => {
		if (gradient) {
			return gradientPreset === 'custom' ? customGradient : gradientPresets[gradientPreset];
		}
		if (isDarkMode) {
			return colorScheme === 'custom' ? color : darkColorSchemes[colorScheme];
		}
		return colorScheme === 'custom' ? color : colorSchemes[colorScheme];
	})();

	// v2.2.0 - Dark mode aware off color
	$: darkOffColor = isDarkMode ? '#374151' : offColor;

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
		if (disabled || loading || readonly || skeleton) {
			event.preventDefault();
			return;
		}

		if (design !== 'multi') {
			const newChecked = !checked;
			checked = newChecked;
			const newValue = newChecked ? (typeof value === 'boolean' ? true : 'on') : (typeof value === 'boolean' ? false : 'off');
			value = newValue;

			// v2.3.0 - Trigger haptic feedback
			triggerHaptic();

			// v2.3.0 - Trigger success animation
			triggerSuccessAnimation();

			// v2.1.0 - Dispatch change event
			dispatch('change', { value: newValue, checked: newChecked });
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled || loading || readonly || skeleton) return;

		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			if (design !== 'multi') {
				const newChecked = !checked;
				checked = newChecked;
				const newValue = newChecked ? (typeof value === 'boolean' ? true : 'on') : (typeof value === 'boolean' ? false : 'off');
				value = newValue;

				// v2.3.0 - Trigger haptic feedback
				triggerHaptic();

				// v2.3.0 - Trigger success animation
				triggerSuccessAnimation();

				// v2.1.0 - Dispatch change event
				dispatch('change', { value: newValue, checked: newChecked });
			}
		}
	}

	// v2.1.0 - Focus/Blur event handlers
	function handleFocus(event: FocusEvent) {
		dispatch('focus', { event });
	}

	function handleBlur(event: FocusEvent) {
		dispatch('blur', { event });
	}

	// v2.1.0 - Multi-select change handler
	function handleMultiChange() {
		dispatch('change', { value });
	}

	// v2.2.0 - Touch gesture handlers
	function handleTouchStart(event: TouchEvent) {
		if (!swipeToToggle || disabled || loading || readonly || skeleton) return;

		touchStartX = event.touches[0].clientX;
		touchCurrentX = touchStartX;
		isDragging = true;
	}

	function handleTouchMove(event: TouchEvent) {
		if (!swipeToToggle || !isDragging || disabled || loading || readonly || skeleton) return;

		touchCurrentX = event.touches[0].clientX;
		const diff = touchCurrentX - touchStartX;

		// Apply RTL correction
		const adjustedDiff = isRTL ? -diff : diff;

		// Calculate drag offset (limited to switch width)
		dragOffset = Math.max(-swipeThreshold, Math.min(swipeThreshold, adjustedDiff));
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!swipeToToggle || !isDragging || disabled || loading || readonly || skeleton) return;

		const diff = touchCurrentX - touchStartX;
		const adjustedDiff = isRTL ? -diff : diff;

		// Toggle if swipe threshold is met
		if (Math.abs(adjustedDiff) >= swipeThreshold) {
			const shouldBeChecked = adjustedDiff > 0;
			if (shouldBeChecked !== checked) {
				checked = shouldBeChecked;
				const newValue = checked ? (typeof value === 'boolean' ? true : 'on') : (typeof value === 'boolean' ? false : 'off');
				value = newValue;

				// v2.3.0 - Trigger haptic feedback
				triggerHaptic();

				// v2.3.0 - Trigger success animation
				triggerSuccessAnimation();

				dispatch('change', { value: newValue, checked });
			}
		}

		// Reset drag state
		isDragging = false;
		dragOffset = 0;
		touchStartX = 0;
		touchCurrentX = 0;
	}
</script>

{#if design === 'inner'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="presentation"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--inner" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<button
					type="button"
					role="switch"
					aria-checked={checked}
					aria-label={ariaLabel || label}
					aria-labelledby={label ? `${uniqueID}-label` : undefined}
					aria-describedby={ariaDescribedBy || (helperText || errorText ? `${uniqueID}-helper` : undefined)}
					aria-required={required}
					aria-invalid={error}
					{disabled}
					tabindex={tabIndex}
					class="switch switch--inner"
					class:checked
					class:loading
					class:rounded
					class:shadow
					class:outline
					class:error
					class:gradient
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:success-animation={showSuccess}
					class:error-animation={showError}
					on:click={handleClick}
					on:keydown={handleKeyDown}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:touchstart={handleTouchStart}
					on:touchmove={handleTouchMove}
					on:touchend={handleTouchEnd}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || activeColor};
					"
				>
					{#if loading}
						<span class="spinner"></span>
					{:else if showSuccess}
						<span class="success-icon">✓</span>
					{:else}
						<span class="switch-text">{checked ? onText : offText}</span>
					{/if}
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
		</div>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		{#if helperText || errorText}
			<span class="switch-helper-text" id="{uniqueID}-helper" class:error-text={error}>
				{error && errorText ? errorText : helperText}
			</span>
		{/if}
	</div>

{:else if design === 'slider' || design === 'ios'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="presentation"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--slider" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<button
					type="button"
					role="switch"
					aria-checked={checked}
					aria-label={ariaLabel || label}
					aria-labelledby={label ? `${uniqueID}-label` : undefined}
					aria-describedby={ariaDescribedBy || (helperText || errorText ? `${uniqueID}-helper` : undefined)}
					aria-required={required}
					aria-invalid={error}
					{disabled}
					tabindex={tabIndex}
					class="switch switch--slider"
					class:checked
					class:loading
					class:shadow
					class:outline
					class:error
					class:gradient
					class:rtl={isRTL}
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:success-animation={showSuccess}
					class:error-animation={showError}
					on:click={handleClick}
					on:keydown={handleKeyDown}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:touchstart={handleTouchStart}
					on:touchmove={handleTouchMove}
					on:touchend={handleTouchEnd}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
					"
				>
					<span class="switch-track">
						<span class="switch-thumb" class:dragging={isDragging}>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{:else if showIcons}
								<span class="switch-icon">{checked ? onIcon : offIcon}</span>
							{/if}
						</span>
					</span>
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
		</div>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		{#if helperText || errorText}
			<span class="switch-helper-text" id="{uniqueID}-helper" class:error-text={error}>
				{error && errorText ? errorText : helperText}
			</span>
		{/if}
	</div>

{:else if design === 'modern'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="presentation"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--modern" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<button
					type="button"
					role="switch"
					aria-checked={checked}
					aria-label={ariaLabel || label}
					aria-labelledby={label ? `${uniqueID}-label` : undefined}
					aria-describedby={ariaDescribedBy || (helperText || errorText ? `${uniqueID}-helper` : undefined)}
					aria-required={required}
					aria-invalid={error}
					{disabled}
					tabindex={tabIndex}
					class="switch switch--modern"
					class:checked
					class:loading
					class:shadow
					class:outline
					class:error
					class:gradient
					class:rtl={isRTL}
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:success-animation={showSuccess}
					class:error-animation={showError}
					on:click={handleClick}
					on:keydown={handleKeyDown}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:touchstart={handleTouchStart}
					on:touchmove={handleTouchMove}
					on:touchend={handleTouchEnd}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
					"
				>
					<span class="switch-track">
						<span class="switch-thumb-modern" class:dragging={isDragging}>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{:else if showIcons}
								<span class="switch-icon-modern">{checked ? onIcon : offIcon}</span>
							{/if}
						</span>
						{#if !loading && !showSuccess && showIcons}
							<span class="track-icons">
								<span class="track-icon track-icon--on">{onIcon}</span>
								<span class="track-icon track-icon--off">{offIcon}</span>
							</span>
						{/if}
					</span>
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
		</div>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		{#if helperText || errorText}
			<span class="switch-helper-text" id="{uniqueID}-helper" class:error-text={error}>
				{error && errorText ? errorText : helperText}
			</span>
		{/if}
	</div>

{:else if design === 'material'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="presentation"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--material" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<button
					type="button"
					role="switch"
					aria-checked={checked}
					aria-label={ariaLabel || label}
					aria-labelledby={label ? `${uniqueID}-label` : undefined}
					aria-describedby={ariaDescribedBy || (helperText || errorText ? `${uniqueID}-helper` : undefined)}
					aria-required={required}
					aria-invalid={error}
					{disabled}
					tabindex={tabIndex}
					class="switch switch--material"
					class:checked
					class:loading
					class:shadow
					class:outline
					class:error
					class:gradient
					class:rtl={isRTL}
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:success-animation={showSuccess}
					class:error-animation={showError}
					on:click={handleClick}
					on:keydown={handleKeyDown}
					on:focus={handleFocus}
					on:blur={handleBlur}
					on:touchstart={handleTouchStart}
					on:touchmove={handleTouchMove}
					on:touchend={handleTouchEnd}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
					"
				>
					<span class="switch-track-material">
						<span class="switch-thumb-material" class:dragging={isDragging}>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{/if}
						</span>
					</span>
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
		</div>
		{#if label && labelPosition === 'right'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		{#if helperText || errorText}
			<span class="switch-helper-text" id="{uniqueID}-helper" class:error-text={error}>
				{error && errorText ? errorText : helperText}
			</span>
		{/if}
	</div>

{:else if design === 'multi'}
	<div
		class="switch-container switch-container--multi"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="presentation"
	>
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--multi" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<div
					role="radiogroup"
					class="switch-multi"
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					aria-labelledby="{uniqueID}-legend"
					aria-describedby={ariaDescribedBy || undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || activeColor};
					"
				>
					{#if label}
						<div class="switch-multi-legend" id="{uniqueID}-legend">{label}</div>
					{/if}
					<div class="switch-multi-options" class:shadow class:outline class:gradient>
						{#each options as option, index}
							<input
								type="radio"
								id="{uniqueID}-{option}"
								{name}
								value={option}
								bind:group={value}
								on:change={handleMultiChange}
								{disabled}
								{required}
								tabindex={tabIndex}
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
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
		</div>
		{#if helperText || errorText}
			<span class="switch-helper-text" id="{uniqueID}-helper" class:error-text={error}>
				{error && errorText ? errorText : helperText}
			</span>
		{/if}
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

	/* v2.2.0 - Dark mode styles */
	.switch-container.dark .switch-label {
		color: #E5E7EB;
	}

	.switch-label {
		user-select: none;
		font-size: 1em;
		color: #374151;
		transition: color var(--animation-duration) var(--animation-easing);
	}

	/* v2.1.0 - Helper Text */
	.switch-helper-text {
		display: block;
		font-size: 0.875em;
		color: #6B7280;
		margin-top: 0.375em;
		line-height: 1.4;
	}

	.switch-helper-text.error-text {
		color: #EF4444;
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

	/* v2.1.0 - Error State */
	.switch.error {
		border-color: #EF4444;
	}

	.switch.error:focus-visible {
		outline-color: #EF4444;
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

	/* v2.2.0 - Gradient support for inner design */
	.switch--inner.checked.gradient {
		background: var(--active-color);
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

	/* v2.2.0 - Gradient support for slider design */
	.switch--slider.checked.gradient .switch-track {
		background: var(--active-color);
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

	/* v2.2.0 - Touch gesture support */
	.switch-thumb.dragging {
		transition: none;
		transform: translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--slider.checked .switch-thumb.dragging {
		transform: translateX(calc(1.5em + var(--drag-offset, 0px)));
	}

	/* v2.2.0 - RTL support */
	.switch--slider.rtl.checked .switch-thumb {
		transform: translateX(-1.5em);
	}

	.switch--slider.rtl.checked .switch-thumb.dragging {
		transform: translateX(calc(-1.5em + var(--drag-offset, 0px)));
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

	/* v2.2.0 - Touch gesture support for modern */
	.switch-thumb-modern.dragging {
		transition: none;
		transform: translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--modern.checked .switch-thumb-modern.dragging {
		transform: translateX(calc(1.8em + var(--drag-offset, 0px)));
	}

	/* v2.2.0 - RTL support for modern */
	.switch--modern.rtl.checked .switch-thumb-modern {
		transform: translateX(-1.8em);
	}

	.switch--modern.rtl.checked .switch-thumb-modern.dragging {
		transform: translateX(calc(-1.8em + var(--drag-offset, 0px)));
	}

	/* v2.2.0 - Gradient support for modern design */
	.switch--modern.checked.gradient .switch-track {
		background: var(--active-color);
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

	/* v2.2.0 - Touch gesture support for material */
	.switch-thumb-material.dragging {
		transition: none;
		transform: translateY(-50%) translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--material.checked .switch-thumb-material.dragging {
		transform: translateY(-50%) translateX(calc(2em + var(--drag-offset, 0px)));
	}

	/* v2.2.0 - RTL support for material */
	.switch--material.rtl.checked .switch-thumb-material {
		transform: translateY(-50%) translateX(-2em);
	}

	.switch--material.rtl.checked .switch-thumb-material.dragging {
		transform: translateY(-50%) translateX(calc(-2em + var(--drag-offset, 0px)));
	}

	/* v2.2.0 - Gradient support for material design */
	.switch--material.checked.gradient .switch-thumb-material {
		background: var(--active-color);
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

	/* v2.2.0 - Gradient support for multi design */
	.switch-multi-options.gradient .switch-multi-input:checked + .switch-multi-label {
		background: var(--active-color);
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

	/* v2.3.0 - Switch Wrapper */
	.switch-wrapper {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	/* v2.3.0 - Pulse Animation */
	.switch.pulse,
	.switch-multi.pulse {
		animation: pulse-animation 2s infinite;
	}

	.switch.pulse-subtle,
	.switch-multi.pulse-subtle {
		animation: pulse-animation-subtle 2s infinite;
	}

	.switch.pulse-normal,
	.switch-multi.pulse-normal {
		animation: pulse-animation-normal 2s infinite;
	}

	.switch.pulse-strong,
	.switch-multi.pulse-strong {
		animation: pulse-animation-strong 2s infinite;
	}

	@keyframes pulse-animation-subtle {
		0%, 100% {
			box-shadow: 0 0 0 0 var(--pulse-color);
		}
		50% {
			box-shadow: 0 0 0 4px color-mix(in srgb, var(--pulse-color) 30%, transparent);
		}
	}

	@keyframes pulse-animation-normal {
		0%, 100% {
			box-shadow: 0 0 0 0 var(--pulse-color);
		}
		50% {
			box-shadow: 0 0 0 8px color-mix(in srgb, var(--pulse-color) 50%, transparent);
		}
	}

	@keyframes pulse-animation-strong {
		0%, 100% {
			box-shadow: 0 0 0 0 var(--pulse-color);
		}
		50% {
			box-shadow: 0 0 0 12px color-mix(in srgb, var(--pulse-color) 70%, transparent);
		}
	}

	@keyframes pulse-animation {
		0%, 100% {
			box-shadow: 0 0 0 0 var(--pulse-color);
		}
		50% {
			box-shadow: 0 0 0 8px color-mix(in srgb, var(--pulse-color) 50%, transparent);
		}
	}

	/* v2.3.0 - Success Animation */
	.switch.success-animation {
		animation: success-pop 0.3s ease-out;
	}

	.switch.success-animation .switch-track,
	.switch.success-animation .switch-track-material {
		background-color: #10B981 !important;
	}

	@keyframes success-pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	.success-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 0.9em;
		animation: success-checkmark 0.3s ease-out;
	}

	.success-icon-small {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #10B981;
		font-size: 0.7em;
		font-weight: bold;
		animation: success-checkmark 0.3s ease-out;
	}

	@keyframes success-checkmark {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* v2.3.0 - Error Animation */
	.switch.error-animation {
		animation: error-shake 0.4s ease-out;
	}

	@keyframes error-shake {
		0%, 100% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-4px);
		}
		40% {
			transform: translateX(4px);
		}
		60% {
			transform: translateX(-4px);
		}
		80% {
			transform: translateX(4px);
		}
	}

	/* v2.3.0 - Skeleton Loading */
	.switch-skeleton {
		background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
		background-size: 200% 100%;
		border-radius: 1em;
	}

	.switch-skeleton--slider,
	.switch-skeleton--modern {
		width: 3.5em;
		height: 2em;
	}

	.switch-skeleton--modern {
		width: 4em;
		height: 2.2em;
	}

	.switch-skeleton--inner {
		width: 4em;
		height: 2em;
		border-radius: 0.5em;
	}

	.switch-skeleton--material {
		width: 3.5em;
		height: 1.5em;
		border-radius: 0.75em;
	}

	.switch-skeleton--multi {
		width: 12em;
		height: 2.5em;
		border-radius: 0.5em;
	}

	.skeleton-text {
		background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
		background-size: 200% 100%;
		border-radius: 0.25em;
		min-width: 4em;
		min-height: 1em;
		color: transparent !important;
	}

	.skeleton-shimmer {
		animation: skeleton-shimmer 1.5s infinite;
	}

	.skeleton-pulse {
		animation: skeleton-pulse 1.5s infinite;
	}

	.skeleton-wave {
		animation: skeleton-wave 1.5s infinite;
	}

	@keyframes skeleton-shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	@keyframes skeleton-pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes skeleton-wave {
		0% {
			background-position: 200% 0;
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			background-position: -200% 0;
			opacity: 1;
		}
	}

	/* v2.3.0 - Dark mode skeleton */
	.switch-container.dark .switch-skeleton,
	.switch-container.dark .skeleton-text {
		background: linear-gradient(90deg, #374151 25%, #4B5563 50%, #374151 75%);
		background-size: 200% 100%;
	}

	/* v2.3.0 - Tooltip */
	.switch-tooltip {
		position: absolute;
		background-color: #1F2937;
		color: white;
		padding: 0.5em 0.75em;
		border-radius: 0.375em;
		font-size: 0.75em;
		white-space: nowrap;
		z-index: 1000;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		animation: tooltip-fade-in 0.2s ease-out;
		pointer-events: none;
	}

	.switch-tooltip::after {
		content: '';
		position: absolute;
		border: 6px solid transparent;
	}

	.switch-tooltip.tooltip-top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.switch-tooltip.tooltip-top::after {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-top-color: #1F2937;
	}

	.switch-tooltip.tooltip-bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.switch-tooltip.tooltip-bottom::after {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-color: #1F2937;
	}

	.switch-tooltip.tooltip-left {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.switch-tooltip.tooltip-left::after {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-left-color: #1F2937;
	}

	.switch-tooltip.tooltip-right {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.switch-tooltip.tooltip-right::after {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-right-color: #1F2937;
	}

	@keyframes tooltip-fade-in {
		0% {
			opacity: 0;
			transform: translateX(-50%) translateY(4px);
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.switch-tooltip.tooltip-left,
	.switch-tooltip.tooltip-right {
		animation: tooltip-fade-in-horizontal 0.2s ease-out;
	}

	@keyframes tooltip-fade-in-horizontal {
		0% {
			opacity: 0;
			transform: translateY(-50%) translateX(4px);
		}
		100% {
			opacity: 1;
			transform: translateY(-50%) translateX(0);
		}
	}
</style>
