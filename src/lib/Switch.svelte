<script lang="ts">
	// ── v3.0.0: Svelte 5 runes migration ──────────────────────────────

	type ColorScheme = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'yellow' | 'indigo' | 'teal' | 'custom';
	type Design = 'inner' | 'slider' | 'ios' | 'modern' | 'material' | 'multi' | 'neon' | 'flip' | 'pill';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
	type PulseIntensity = 'subtle' | 'normal' | 'strong';
	type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave';
	type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
	type HapticPattern = 'light' | 'medium' | 'heavy' | number[];
	type GradientPreset = 'sunset' | 'ocean' | 'forest' | 'berry' | 'fire' | 'custom';
	type Dir = 'ltr' | 'rtl' | 'auto';

	interface Props {
		value?: boolean | string;
		label?: string;
		design?: Design;
		options?: string[];
		size?: Size;
		color?: string;
		offColor?: string;
		colorScheme?: ColorScheme;
		disabled?: boolean;
		loading?: boolean;
		readonly?: boolean;
		showIcons?: boolean;
		onIcon?: string;
		offIcon?: string;
		animationDuration?: number;
		animationEasing?: string;
		ariaLabel?: string;
		ariaDescribedBy?: string;
		id?: string;
		name?: string;
		tabIndex?: number;
		labelPosition?: 'left' | 'right';
		rounded?: boolean;
		shadow?: boolean;
		outline?: boolean;
		onText?: string;
		offText?: string;
		helperText?: string;
		errorText?: string;
		required?: boolean;
		error?: boolean;
		darkMode?: boolean | 'auto';
		gradient?: boolean;
		gradientPreset?: GradientPreset;
		customGradient?: string;
		swipeToToggle?: boolean;
		swipeThreshold?: number;
		dir?: Dir;
		pulse?: boolean;
		pulseColor?: string;
		pulseIntensity?: PulseIntensity;
		showSuccessAnimation?: boolean;
		showErrorAnimation?: boolean;
		successDuration?: number;
		hapticFeedback?: boolean;
		hapticPattern?: HapticPattern;
		skeleton?: boolean;
		skeletonAnimation?: SkeletonAnimation;
		tooltip?: string;
		tooltipPosition?: TooltipPosition;
		tooltipDelay?: number;
		// v3.0.0
		flipFrontContent?: string;
		flipBackContent?: string;
		dragMomentum?: boolean;
		longPress?: boolean;
		longPressDuration?: number;
		confirmToggle?: boolean;
		confirmMessage?: string;
		onconfirm?: () => Promise<boolean>;
		onchange?: (payload: { value: boolean | string; checked: boolean }) => void;
		onfocus?: (payload: { event: FocusEvent }) => void;
		onblur?: (payload: { event: FocusEvent }) => void;
	}

	let {
		value = $bindable(false as boolean | string),
		label = '',
		design = 'slider' as Design,
		options = [] as string[],
		size = 'md' as Size,
		color = '#007AFF',
		offColor = '#E5E7EB',
		colorScheme = 'blue' as ColorScheme,
		disabled = false,
		loading = false,
		readonly = false,
		showIcons = false,
		onIcon = '✓',
		offIcon = '✕',
		animationDuration = 300,
		animationEasing = 'ease-in-out',
		ariaLabel = '',
		ariaDescribedBy = '',
		id = '',
		name = '',
		tabIndex = 0,
		labelPosition = 'right' as 'left' | 'right',
		rounded = true,
		shadow = false,
		outline = false,
		onText = 'ON',
		offText = 'OFF',
		helperText = '',
		errorText = '',
		required = false,
		error = false,
		darkMode = false as boolean | 'auto',
		gradient = false,
		gradientPreset = 'sunset' as GradientPreset,
		customGradient = '',
		swipeToToggle = false,
		swipeThreshold = 50,
		dir = 'auto' as Dir,
		pulse = false,
		pulseColor = '',
		pulseIntensity = 'normal' as PulseIntensity,
		showSuccessAnimation = false,
		showErrorAnimation = false,
		successDuration = 1500,
		hapticFeedback = false,
		hapticPattern = 'light' as HapticPattern,
		skeleton = false,
		skeletonAnimation = 'shimmer' as SkeletonAnimation,
		tooltip = '',
		tooltipPosition = 'top' as TooltipPosition,
		tooltipDelay = 300,
		// v3.0.0
		flipFrontContent = 'OFF',
		flipBackContent = 'ON',
		dragMomentum = false,
		longPress = false,
		longPressDuration = 600,
		confirmToggle = false,
		confirmMessage = 'Are you sure?',
		onconfirm = undefined as (() => Promise<boolean>) | undefined,
		onchange = undefined as ((payload: { value: boolean | string; checked: boolean }) => void) | undefined,
		onfocus: onFocusProp = undefined as ((payload: { event: FocusEvent }) => void) | undefined,
		onblur: onBlurProp = undefined as ((payload: { event: FocusEvent }) => void) | undefined,
	}: Props = $props();

	// ── Internal state ─────────────────────────────────────────────────
	let checked = $state(typeof value === 'boolean' ? value : value === 'on');
	const uniqueID = id || `switch-${Math.floor(Math.random() * 1000000)}`;

	// Dark mode
	let isDarkMode = $state(false);
	if (typeof window !== 'undefined') {
		if (darkMode === 'auto') {
			isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				isDarkMode = e.matches;
			});
		} else {
			isDarkMode = darkMode === true;
		}
	}

	// Gradient presets
	const gradientPresets: Record<string, string> = {
		sunset: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
		ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		forest: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
		berry: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
		fire: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
		custom: customGradient
	};

	// Touch gesture state (existing swipeToToggle)
	let touchStartX = $state(0);
	let touchCurrentX = $state(0);
	let isDragging = $state(false);
	let dragOffset = $state(0);

	// Animation states
	let showSuccess = $state(false);
	let showError = $state(false);
	let isTooltipVisible = $state(false);
	let tooltipTimeoutId = $state<ReturnType<typeof setTimeout> | null>(null);

	// v3.0.0 – Interaction states
	let isPending = $state(false);
	let showConfirmPrompt = $state(false);
	let longPressProgress = $state(0);
	let longPressTimer = $state<ReturnType<typeof setTimeout> | null>(null);
	let longPressInterval = $state<ReturnType<typeof setInterval> | null>(null);
	let dragStartX = $state(0);
	let dragStartTime = $state(0);
	let isDragActive = $state(false);
	let dragCurrentX = $state(0);
	let dragThumbOffset = $state(0);

	// RTL detection
	let isRTL = $state(false);
	if (typeof document !== 'undefined') {
		if (dir === 'auto') {
			isRTL = document.documentElement.dir === 'rtl' || document.body.dir === 'rtl';
		} else {
			isRTL = dir === 'rtl';
		}
	}

	// Color schemes
	const colorSchemes: Record<string, string> = {
		blue: '#007AFF', green: '#10B981', red: '#EF4444', purple: '#8B5CF6',
		orange: '#F97316', pink: '#EC4899', yellow: '#F59E0B', indigo: '#6366F1',
		teal: '#14B8A6', custom: color
	};
	const darkColorSchemes: Record<string, string> = {
		blue: '#0A84FF', green: '#30D158', red: '#FF453A', purple: '#BF5AF2',
		orange: '#FF9F0A', pink: '#FF375F', yellow: '#FFD60A', indigo: '#5E5CE6',
		teal: '#40C8E0', custom: color
	};
	// v3.0.0 – Neon glow colors per scheme
	const neonColorSchemes: Record<string, string> = {
		blue: '#00BFFF', green: '#39FF14', red: '#FF073A', purple: '#CF4AFF',
		orange: '#FF6600', pink: '#FF69B4', yellow: '#FFE000', indigo: '#7B61FF',
		teal: '#00FFEF', custom: color
	};

	// Derived values
	let activeColor = $derived((() => {
		if (gradient) {
			return gradientPreset === 'custom' ? customGradient : gradientPresets[gradientPreset];
		}
		if (isDarkMode) {
			return colorScheme === 'custom' ? color : darkColorSchemes[colorScheme];
		}
		return colorScheme === 'custom' ? color : colorSchemes[colorScheme];
	})());

	let neonColor = $derived(colorScheme === 'custom' ? color : neonColorSchemes[colorScheme]);
	let darkOffColor = $derived(isDarkMode ? '#374151' : offColor);

	// Size map
	const sizeMap: Record<string, number> = { xs: 0.75, sm: 0.875, md: 1, lg: 1.25, xl: 1.5 };
	const fontSize = typeof size === 'number' ? size : sizeMap[size];

	// Haptic patterns
	const hapticPatterns: Record<string, number[]> = {
		light: [10], medium: [20], heavy: [30, 10, 30]
	};

	// Sync checked ← value (external changes)
	$effect(() => {
		if (design !== 'multi') {
			const newChecked = typeof value === 'boolean' ? value : value === 'on';
			if (newChecked !== checked) checked = newChecked;
		}
	});

	// ── Helpers ────────────────────────────────────────────────────────
	function triggerHaptic() {
		if (!hapticFeedback || typeof navigator === 'undefined' || !navigator.vibrate) return;
		const pattern = typeof hapticPattern === 'object' ? hapticPattern : hapticPatterns[hapticPattern as string];
		try { navigator.vibrate(pattern); } catch { /* not supported */ }
	}

	function triggerSuccessAnimation() {
		if (!showSuccessAnimation) return;
		showSuccess = true;
		setTimeout(() => { showSuccess = false; }, successDuration);
	}

	function handleMouseEnter() {
		if (!tooltip) return;
		tooltipTimeoutId = setTimeout(() => { isTooltipVisible = true; }, tooltipDelay);
	}

	function handleMouseLeave() {
		if (tooltipTimeoutId) { clearTimeout(tooltipTimeoutId); tooltipTimeoutId = null; }
		isTooltipVisible = false;
	}

	function commitToggle() {
		if (disabled || loading || readonly || skeleton) return;
		if (design !== 'multi') {
			const newChecked = !checked;
			checked = newChecked;
			const newValue = newChecked
				? (typeof value === 'boolean' ? true : 'on')
				: (typeof value === 'boolean' ? false : 'off');
			value = newValue;
			triggerHaptic();
			triggerSuccessAnimation();
			onchange?.({ value: newValue, checked: newChecked });
		}
	}

	// v3.0.0 – confirmToggle
	async function handleConfirmToggle() {
		if (onconfirm) {
			isPending = true;
			const confirmed = await onconfirm();
			isPending = false;
			if (confirmed) commitToggle();
		} else {
			showConfirmPrompt = true;
		}
	}

	function confirmYes() {
		showConfirmPrompt = false;
		commitToggle();
	}

	function confirmNo() {
		showConfirmPrompt = false;
	}

	// v3.0.0 – longPress
	function startLongPress() {
		if (disabled || loading || readonly || skeleton) return;
		longPressProgress = 0;
		const step = 50;
		longPressInterval = setInterval(() => {
			longPressProgress = Math.min(100, longPressProgress + (step / longPressDuration) * 100);
		}, step);
		longPressTimer = setTimeout(() => {
			cancelLongPress();
			if (confirmToggle) {
				handleConfirmToggle();
			} else {
				commitToggle();
			}
		}, longPressDuration);
	}

	function cancelLongPress() {
		if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
		if (longPressInterval) { clearInterval(longPressInterval); longPressInterval = null; }
		longPressProgress = 0;
	}

	// v3.0.0 – dragMomentum
	function handleDragStart(event: PointerEvent) {
		if (!dragMomentum || disabled || loading || readonly || skeleton) return;
		isDragActive = true;
		dragStartX = event.clientX;
		dragStartTime = Date.now();
		dragCurrentX = event.clientX;
		dragThumbOffset = 0;
		(event.currentTarget as HTMLElement)?.setPointerCapture(event.pointerId);
	}

	function handleDragMove(event: PointerEvent) {
		if (!dragMomentum || !isDragActive) return;
		dragCurrentX = event.clientX;
		const diff = isRTL ? dragStartX - event.clientX : event.clientX - dragStartX;
		dragThumbOffset = Math.max(-40, Math.min(40, diff));
	}

	function handleDragEnd(event: PointerEvent) {
		if (!dragMomentum || !isDragActive) return;
		isDragActive = false;
		const elapsed = Math.max(1, Date.now() - dragStartTime);
		const totalDiff = isRTL ? dragStartX - event.clientX : event.clientX - dragStartX;
		const velocity = totalDiff / elapsed;
		dragThumbOffset = 0;
		const shouldToggleByVelocity = Math.abs(velocity) > 0.3;
		const shouldToggleByPosition = Math.abs(totalDiff) > 20;
		if (shouldToggleByVelocity || shouldToggleByPosition) {
			const shouldBeOn = totalDiff > 0;
			if (shouldBeOn !== checked) commitToggle();
		}
	}

	// Main click handler
	function handleClick(event: MouseEvent) {
		if (disabled || loading || readonly || skeleton) {
			event.preventDefault();
			return;
		}
		if (longPress) return;
		if (dragMomentum && Math.abs(dragCurrentX - dragStartX) > 5) return;
		if (design !== 'multi') {
			if (confirmToggle) {
				handleConfirmToggle();
			} else {
				commitToggle();
			}
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (disabled || loading || readonly || skeleton) return;
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			if (design !== 'multi') {
				if (confirmToggle) {
					handleConfirmToggle();
				} else {
					commitToggle();
				}
			}
		}
	}

	function handleFocusEvent(event: FocusEvent) {
		onFocusProp?.({ event });
	}

	function handleBlurEvent(event: FocusEvent) {
		onBlurProp?.({ event });
	}

	function handleMultiChange() {
		onchange?.({ value: value as string, checked: true });
	}

	// Touch gesture handlers (existing swipeToToggle)
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
		const adjustedDiff = isRTL ? -diff : diff;
		dragOffset = Math.max(-swipeThreshold, Math.min(swipeThreshold, adjustedDiff));
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!swipeToToggle || !isDragging || disabled || loading || readonly || skeleton) return;
		const diff = touchCurrentX - touchStartX;
		const adjustedDiff = isRTL ? -diff : diff;
		if (Math.abs(adjustedDiff) >= swipeThreshold) {
			const shouldBeChecked = adjustedDiff > 0;
			if (shouldBeChecked !== checked) {
				checked = shouldBeChecked;
				const newValue = checked
					? (typeof value === 'boolean' ? true : 'on')
					: (typeof value === 'boolean' ? false : 'off');
				value = newValue;
				triggerHaptic();
				triggerSuccessAnimation();
				onchange?.({ value: newValue, checked });
			}
		}
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
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
					onpointerdown={!dragMomentum && longPress ? startLongPress : (dragMomentum ? handleDragStart : undefined)}
					onpointerup={!dragMomentum && longPress ? cancelLongPress : (dragMomentum ? handleDragEnd : undefined)}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || activeColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					{#if loading}
						<span class="spinner"></span>
					{:else if showSuccess}
						<span class="success-icon">✓</span>
					{:else}
						<span class="switch-text">{checked ? onText : offText}</span>
					{/if}
					{#if longPress && longPressProgress > 0}
						<svg class="long-press-ring" viewBox="0 0 36 36">
							<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
							<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
								stroke-dasharray="100.5"
								stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
						</svg>
					{/if}
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
					onpointerdown={!dragMomentum && longPress ? startLongPress : (dragMomentum ? handleDragStart : undefined)}
					onpointermove={dragMomentum ? handleDragMove : undefined}
					onpointerup={!dragMomentum && longPress ? cancelLongPress : (dragMomentum ? handleDragEnd : undefined)}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					<span class="switch-track">
						<span
							class="switch-thumb"
							class:dragging={isDragging}
							class:drag-active={isDragActive}
							style={isDragActive ? `transform: translateX(${(checked ? 1.5 : 0) * fontSize + dragThumbOffset / 16}em); transition: none;` : ''}
						>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{:else if showIcons}
								<span class="switch-icon">{checked ? onIcon : offIcon}</span>
							{/if}
							{#if longPress && longPressProgress > 0}
								<svg class="long-press-ring" viewBox="0 0 36 36">
									<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
									<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
										stroke-dasharray="100.5"
										stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
								</svg>
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
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
					onpointerdown={!dragMomentum && longPress ? startLongPress : (dragMomentum ? handleDragStart : undefined)}
					onpointermove={dragMomentum ? handleDragMove : undefined}
					onpointerup={!dragMomentum && longPress ? cancelLongPress : (dragMomentum ? handleDragEnd : undefined)}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					<span class="switch-track">
						<span
							class="switch-thumb-modern"
							class:dragging={isDragging}
							class:drag-active={isDragActive}
							style={isDragActive ? `transform: translateX(${(checked ? 1.8 : 0) * fontSize + dragThumbOffset / 16}em); transition: none;` : ''}
						>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{:else if showIcons}
								<span class="switch-icon-modern">{checked ? onIcon : offIcon}</span>
							{/if}
							{#if longPress && longPressProgress > 0}
								<svg class="long-press-ring" viewBox="0 0 36 36">
									<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
									<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
										stroke-dasharray="100.5"
										stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
								</svg>
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
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
					onpointerdown={!dragMomentum && longPress ? startLongPress : (dragMomentum ? handleDragStart : undefined)}
					onpointermove={dragMomentum ? handleDragMove : undefined}
					onpointerup={!dragMomentum && longPress ? cancelLongPress : (dragMomentum ? handleDragEnd : undefined)}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--drag-offset: {dragOffset}px;
						--pulse-color: {pulseColor || activeColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					<span class="switch-track-material">
						<span
							class="switch-thumb-material"
							class:dragging={isDragging}
							class:drag-active={isDragActive}
							style={isDragActive ? `transform: translateY(-50%) translateX(${(checked ? 2 : 0) * fontSize + dragThumbOffset / 16}em); transition: none;` : ''}
						>
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{/if}
							{#if longPress && longPressProgress > 0}
								<svg class="long-press-ring" viewBox="0 0 36 36">
									<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
									<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
										stroke-dasharray="100.5"
										stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
								</svg>
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
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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

{:else if design === 'neon'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class="switch switch--neon"
					class:checked
					class:loading
					class:shadow
					class:outline
					class:error
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:success-animation={showSuccess}
					class:error-animation={showError}
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					onpointerdown={!dragMomentum && longPress ? startLongPress : (dragMomentum ? handleDragStart : undefined)}
					onpointermove={dragMomentum ? handleDragMove : undefined}
					onpointerup={!dragMomentum && longPress ? cancelLongPress : (dragMomentum ? handleDragEnd : undefined)}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--neon-color: {neonColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || neonColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					<span class="switch-track switch-track--neon">
						<span class="switch-thumb switch-thumb--neon">
							{#if loading}
								<span class="spinner-small"></span>
							{:else if showSuccess}
								<span class="success-icon-small">✓</span>
							{:else if showIcons}
								<span class="switch-icon">{checked ? onIcon : offIcon}</span>
							{/if}
							{#if longPress && longPressProgress > 0}
								<svg class="long-press-ring" viewBox="0 0 36 36">
									<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
									<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
										stroke-dasharray="100.5"
										stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
								</svg>
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
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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

{:else if design === 'flip'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
					class="switch switch--flip"
					class:checked
					class:loading
					class:shadow
					class:error
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:pending={isPending}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleFocusEvent}
					onblur={handleBlurEvent}
					onpointerdown={longPress ? startLongPress : undefined}
					onpointerup={longPress ? cancelLongPress : undefined}
					onpointerleave={longPress ? cancelLongPress : undefined}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || activeColor};
						--long-press-progress: {longPressProgress}%;
					"
				>
					<div class="flip-card">
						<div class="flip-card-inner">
							<div class="flip-card-front">
								{#if loading}
									<span class="spinner"></span>
								{:else}
									{flipFrontContent}
								{/if}
							</div>
							<div class="flip-card-back">
								{#if loading}
									<span class="spinner"></span>
								{:else}
									{flipBackContent}
								{/if}
							</div>
						</div>
					</div>
					{#if longPress && longPressProgress > 0}
						<svg class="long-press-ring long-press-ring--flip" viewBox="0 0 36 36">
							<circle class="long-press-ring-track" cx="18" cy="18" r="16" />
							<circle class="long-press-ring-fill" cx="18" cy="18" r="16"
								stroke-dasharray="100.5"
								stroke-dashoffset="{100.5 - (longPressProgress / 100) * 100.5}" />
						</svg>
					{/if}
				</button>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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

{:else if design === 'pill'}
	<div
		class="switch-container"
		class:disabled
		class:readonly
		class:dark={isDarkMode}
		class:skeleton
		style="font-size: {fontSize}rem; direction: {isRTL ? 'rtl' : 'ltr'};"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="presentation"
	>
		{#if label && labelPosition === 'left'}
			<span class="switch-label" class:skeleton-text={skeleton} id="{uniqueID}-label">{skeleton ? '' : label}</span>
		{/if}
		<div class="switch-wrapper">
			{#if skeleton}
				<div class="switch-skeleton switch-skeleton--multi" class:skeleton-shimmer={skeletonAnimation === 'shimmer'} class:skeleton-pulse={skeletonAnimation === 'pulse'} class:skeleton-wave={skeletonAnimation === 'wave'}></div>
			{:else}
				<div
					class="switch-pill"
					class:shadow
					class:outline
					class:gradient
					class:pulse
					class:pulse-subtle={pulse && pulseIntensity === 'subtle'}
					class:pulse-normal={pulse && pulseIntensity === 'normal'}
					class:pulse-strong={pulse && pulseIntensity === 'strong'}
					class:pending={isPending}
					role="group"
					aria-label={ariaLabel || label}
					style="
						--active-color: {activeColor};
						--off-color: {darkOffColor};
						--animation-duration: {animationDuration}ms;
						--animation-easing: {animationEasing};
						--pulse-color: {pulseColor || activeColor};
					"
				>
					<button
						type="button"
						class="pill-btn pill-btn--off"
						class:pill-active={!checked}
						{disabled}
						tabindex={!checked ? 0 : tabIndex}
						onclick={() => {
							if (!disabled && !loading && !readonly && !skeleton && checked) {
								if (confirmToggle) { handleConfirmToggle(); } else { commitToggle(); }
							}
						}}
						onkeydown={(e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); if (checked) commitToggle(); } }}
					>
						{#if loading && !checked}
							<span class="spinner"></span>
						{:else}
							{offText}
						{/if}
					</button>
					<button
						type="button"
						class="pill-btn pill-btn--on"
						class:pill-active={checked}
						{disabled}
						tabindex={checked ? 0 : tabIndex}
						onclick={() => {
							if (!disabled && !loading && !readonly && !skeleton && !checked) {
								if (confirmToggle) { handleConfirmToggle(); } else { commitToggle(); }
							}
						}}
						onkeydown={(e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); if (!checked) commitToggle(); } }}
					>
						{#if loading && checked}
							<span class="spinner"></span>
						{:else}
							{onText}
						{/if}
					</button>
				</div>
			{/if}
			{#if tooltip && isTooltipVisible}
				<div class="switch-tooltip" class:tooltip-top={tooltipPosition === 'top'} class:tooltip-bottom={tooltipPosition === 'bottom'} class:tooltip-left={tooltipPosition === 'left'} class:tooltip-right={tooltipPosition === 'right'}>
					{tooltip}
				</div>
			{/if}
			{#if showConfirmPrompt}
				<div class="confirm-prompt">
					<span class="confirm-message">{confirmMessage}</span>
					<button class="confirm-btn confirm-btn--yes" onclick={confirmYes}>Yes</button>
					<button class="confirm-btn confirm-btn--no" onclick={confirmNo}>No</button>
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
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
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
								onchange={handleMultiChange}
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

	.switch-thumb.dragging {
		transition: none;
		transform: translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--slider.checked .switch-thumb.dragging {
		transform: translateX(calc(1.5em + var(--drag-offset, 0px)));
	}

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

	.switch-thumb-modern.dragging {
		transition: none;
		transform: translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--modern.checked .switch-thumb-modern.dragging {
		transform: translateX(calc(1.8em + var(--drag-offset, 0px)));
	}

	.switch--modern.rtl.checked .switch-thumb-modern {
		transform: translateX(-1.8em);
	}

	.switch--modern.rtl.checked .switch-thumb-modern.dragging {
		transform: translateX(calc(-1.8em + var(--drag-offset, 0px)));
	}

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

	.switch-thumb-material.dragging {
		transition: none;
		transform: translateY(-50%) translateX(calc(var(--drag-offset, 0px)));
	}

	.switch--material.checked .switch-thumb-material.dragging {
		transform: translateY(-50%) translateX(calc(2em + var(--drag-offset, 0px)));
	}

	.switch--material.rtl.checked .switch-thumb-material {
		transform: translateY(-50%) translateX(-2em);
	}

	.switch--material.rtl.checked .switch-thumb-material.dragging {
		transform: translateY(-50%) translateX(calc(-2em + var(--drag-offset, 0px)));
	}

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
		to { transform: rotate(360deg); }
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
		0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
		50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--pulse-color) 30%, transparent); }
	}

	@keyframes pulse-animation-normal {
		0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
		50% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--pulse-color) 50%, transparent); }
	}

	@keyframes pulse-animation-strong {
		0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
		50% { box-shadow: 0 0 0 12px color-mix(in srgb, var(--pulse-color) 70%, transparent); }
	}

	@keyframes pulse-animation {
		0%, 100% { box-shadow: 0 0 0 0 var(--pulse-color); }
		50% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--pulse-color) 50%, transparent); }
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
		0% { transform: scale(1); }
		50% { transform: scale(1.05); }
		100% { transform: scale(1); }
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
		0% { transform: scale(0); opacity: 0; }
		50% { transform: scale(1.2); }
		100% { transform: scale(1); opacity: 1; }
	}

	/* v2.3.0 - Error Animation */
	.switch.error-animation {
		animation: error-shake 0.4s ease-out;
	}

	@keyframes error-shake {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-4px); }
		40% { transform: translateX(4px); }
		60% { transform: translateX(-4px); }
		80% { transform: translateX(4px); }
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
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	@keyframes skeleton-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	@keyframes skeleton-wave {
		0% { background-position: 200% 0; opacity: 1; }
		50% { opacity: 0.7; }
		100% { background-position: -200% 0; opacity: 1; }
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
		0% { opacity: 0; transform: translateX(-50%) translateY(4px); }
		100% { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	.switch-tooltip.tooltip-left,
	.switch-tooltip.tooltip-right {
		animation: tooltip-fade-in-horizontal 0.2s ease-out;
	}

	@keyframes tooltip-fade-in-horizontal {
		0% { opacity: 0; transform: translateY(-50%) translateX(4px); }
		100% { opacity: 1; transform: translateY(-50%) translateX(0); }
	}

	/* v3.0.0 – Neon Design */
	.switch--neon {
		padding: 0;
		background: transparent;
		width: 3.5em;
		height: 2em;
	}

	.switch-track--neon {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		background-color: #0d0d0d;
		border-radius: 1em;
		border: 1px solid var(--neon-color);
		box-shadow: 0 0 6px var(--neon-color), inset 0 0 6px rgba(0,0,0,0.8);
		transition: box-shadow var(--animation-duration) var(--animation-easing),
		            border-color var(--animation-duration) var(--animation-easing);
	}

	.switch--neon.checked .switch-track--neon {
		box-shadow: 0 0 12px var(--neon-color), 0 0 24px var(--neon-color), inset 0 0 6px rgba(0,0,0,0.8);
	}

	.switch-thumb--neon {
		position: absolute;
		top: 0.15em;
		left: 0.15em;
		width: 1.7em;
		height: 1.7em;
		background-color: #1a1a1a;
		border-radius: 50%;
		transition: transform var(--animation-duration) var(--animation-easing),
		            box-shadow var(--animation-duration) var(--animation-easing),
		            background-color var(--animation-duration) var(--animation-easing);
		box-shadow: 0 0 4px var(--neon-color), 0 2px 4px rgba(0,0,0,0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	}

	.switch--neon.checked .switch-thumb--neon {
		transform: translateX(1.5em);
		box-shadow: 0 0 10px var(--neon-color), 0 0 20px var(--neon-color);
		background-color: var(--neon-color);
	}

	/* v3.0.0 – Flip Design */
	.switch--flip {
		padding: 0;
		background: transparent;
		width: 4em;
		height: 2.4em;
		perspective: 600px;
	}

	.flip-card {
		width: 100%;
		height: 100%;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform var(--animation-duration) var(--animation-easing);
		border-radius: 0.4em;
	}

	.switch--flip.checked .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		border-radius: 0.4em;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.875em;
		user-select: none;
		box-shadow: 0 2px 6px rgba(0,0,0,0.15);
	}

	.flip-card-front {
		background-color: var(--off-color);
		color: #6B7280;
	}

	.flip-card-back {
		background-color: var(--active-color);
		color: white;
		transform: rotateY(180deg);
	}

	/* v3.0.0 – Pill Design */
	.switch-pill {
		display: inline-flex;
		background-color: var(--off-color);
		border-radius: 2em;
		padding: 0.2em;
		gap: 0;
	}

	.switch-pill.shadow {
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.switch-pill.outline {
		border: 1px solid #D1D5DB;
	}

	.pill-btn {
		padding: 0.4em 1em;
		border: none;
		background: transparent;
		border-radius: 2em;
		cursor: pointer;
		font-size: 0.875em;
		font-weight: 500;
		color: #9CA3AF;
		transition: all var(--animation-duration) var(--animation-easing);
		font-family: inherit;
		user-select: none;
	}

	.pill-btn:disabled {
		cursor: not-allowed;
	}

	.pill-btn:focus-visible {
		outline: 2px solid var(--active-color);
		outline-offset: 2px;
	}

	.pill-btn.pill-active {
		background-color: var(--active-color);
		color: white;
		box-shadow: 0 1px 3px rgba(0,0,0,0.15);
	}

	.switch-pill.gradient .pill-btn.pill-active {
		background: var(--active-color);
	}

	/* v3.0.0 – Pending state (confirmToggle) */
	.switch.pending .switch-track,
	.switch.pending .switch-track--neon,
	.switch.pending .switch-track-material {
		background-color: #F59E0B !important;
	}

	.switch.pending,
	.switch-pill.pending {
		animation: pending-pulse 1s infinite;
	}

	@keyframes pending-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	/* v3.0.0 – Confirm prompt */
	.confirm-prompt {
		position: absolute;
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		gap: 0.4em;
		background: white;
		border: 1px solid #E5E7EB;
		border-radius: 0.5em;
		padding: 0.3em 0.5em;
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
		white-space: nowrap;
		z-index: 1001;
		animation: tooltip-fade-in 0.15s ease-out;
	}

	.confirm-message {
		font-size: 0.75em;
		color: #374151;
	}

	.confirm-btn {
		border: none;
		border-radius: 0.25em;
		padding: 0.2em 0.5em;
		font-size: 0.7em;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
	}

	.confirm-btn--yes {
		background-color: #10B981;
		color: white;
	}

	.confirm-btn--no {
		background-color: #E5E7EB;
		color: #374151;
	}

	/* v3.0.0 – Long-press progress ring */
	.long-press-ring {
		position: absolute;
		top: -0.2em;
		left: -0.2em;
		width: calc(100% + 0.4em);
		height: calc(100% + 0.4em);
		pointer-events: none;
	}

	.long-press-ring--flip {
		top: -0.3em;
		left: -0.3em;
		width: calc(100% + 0.6em);
		height: calc(100% + 0.6em);
	}

	.long-press-ring-track {
		fill: none;
		stroke: rgba(0,0,0,0.1);
		stroke-width: 2;
	}

	.long-press-ring-fill {
		fill: none;
		stroke: var(--active-color);
		stroke-width: 2;
		stroke-linecap: round;
		transform: rotate(-90deg);
		transform-origin: 50% 50%;
		transition: stroke-dashoffset 0.05s linear;
	}
</style>
