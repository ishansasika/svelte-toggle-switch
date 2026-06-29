# Svelte Toggle Switch

A comprehensive, accessible, and highly customizable toggle switch component for Svelte applications. Built with TypeScript and designed with accessibility in mind.

## Features

✨ **8 Design Variants**: Slider (iOS), Inner, Modern, Material, Multi, Neon, Flip, Pill\
🎨 **9 Color Schemes**: Blue, green, red, purple, orange, pink, yellow, indigo, teal + custom\
📏 **5 Size Options**: From extra small to extra large\
♿ **Fully Accessible**: ARIA attributes, keyboard navigation, screen reader support\
🔄 **State Management**: Disabled, loading, and read-only states\
🎯 **Icon Support**: Custom icons with flexible positioning\
⚡ **Smooth Animations**: Customizable duration and easing\
📦 **TypeScript**: `SwitchProps` type export + full Svelte 5 runes\
🎭 **Flexible Styling**: Shadow, outline, and label positioning options\
🌙 **Dark Mode Support**: Auto-detect system theme or manual control\
🌈 **Gradient Colors**: 5 beautiful gradient presets + custom gradients\
👆 **Touch Gestures**: Swipe to toggle, drag momentum on mobile\
🌐 **RTL Support**: Full right-to-left language support\
💫 **Pulse Animation**: Draw attention with pulsing glow effects\
✅ **Success/Error Animations**: Visual feedback with animations\
📳 **Haptic Feedback**: Vibration feedback on mobile devices\
💀 **Skeleton Loading**: Shimmer/pulse placeholders while loading\
💬 **Tooltip Support**: Built-in tooltips with positioning\
🔮 **Neon Design**: Cyberpunk glow with color-matched bloom (v3.0.0)\
🃏 **Flip Design**: 3D card that rotates 180° on toggle (v3.0.0)\
💊 **Pill Design**: Binary segmented control with pill buttons (v3.0.0)\
🖱️ **Drag Momentum**: Thumb follows pointer, snaps by velocity (v3.0.0)\
⏳ **Long Press**: Animated progress ring prevents accidental toggles (v3.0.0)\
🔒 **Confirm Toggle**: Async callback or inline Yes/No prompt (v3.0.0)\
🚀 **Modern Stack**: Built with Svelte 5 runes, Vite 6, and TypeScript 5

## Installation

### NPM
```bash
npm install svelte-toggle-switch
```

### Yarn
```bash
yarn add svelte-toggle-switch
```

### PNPM
```bash
pnpm add svelte-toggle-switch
```

## Quick Start

```svelte
<script>
  import Switch from 'svelte-toggle-switch';

  let enabled = false;
</script>

<Switch bind:value={enabled} label="Enable notifications" />
```

## Migrating from v2 to v3

**One breaking change:** event syntax. Update all event handlers:

```svelte
<!-- v2.x -->
<Switch on:change={handler} on:focus={onFocus} on:blur={onBlur} />

<!-- v3.0 -->
<Switch onchange={handler} onfocus={onFocus} onblur={onBlur} />
```

All prop values, names, and defaults are unchanged.

## New in v3.0.0

### 🔮 Neon Design

```svelte
<Switch design="neon" colorScheme="blue" bind:value darkMode={true} />
```

### 🃏 Flip Design

```svelte
<Switch design="flip" flipFrontContent="OFF" flipBackContent="ON" bind:value />
```

### 💊 Pill Design

```svelte
<Switch design="pill" onText="ON" offText="OFF" bind:value />
```

### ⏳ Long Press

```svelte
<Switch longPress={true} longPressDuration={600} bind:value label="Hold to toggle" />
```

### 🔒 Confirm Toggle

```svelte
<script>
  async function confirmChange() {
    return await myDialog.confirm('Are you sure?');
  }
</script>

<Switch confirmToggle={true} onconfirm={confirmChange} bind:value />
<!-- Or use built-in inline prompt: -->
<Switch confirmToggle={true} confirmMessage="Enable this?" bind:value />
```

### 🖱️ Drag Momentum

```svelte
<Switch dragMomentum={true} bind:value />
```

## New in v2.3.0

### 💫 Pulse Animation

Draw attention to important toggles with a pulsing glow effect.

```svelte
<!-- Subtle pulse -->
<Switch bind:value={enabled} pulse={true} pulseIntensity="subtle" label="Notifications" />

<!-- Normal pulse (default) -->
<Switch bind:value={enabled} pulse={true} pulseIntensity="normal" label="New Feature" />

<!-- Strong pulse -->
<Switch bind:value={enabled} pulse={true} pulseIntensity="strong" label="Important!" />

<!-- Custom pulse color -->
<Switch bind:value={enabled} pulse={true} pulseColor="#FF6B6B" label="Custom Glow" />
```

### ✅ Success Animation

Visual feedback with checkmark animation when toggle action succeeds.

```svelte
<!-- Enable success animation -->
<Switch bind:value={enabled} showSuccessAnimation={true} label="Save changes" />

<!-- Custom animation duration -->
<Switch
  bind:value={enabled}
  showSuccessAnimation={true}
  successDuration={2000}
  label="Long feedback"
/>
```

### 📳 Haptic Feedback

Vibration feedback on mobile devices using the Vibration API.

```svelte
<!-- Light haptic -->
<Switch bind:value={enabled} hapticFeedback={true} hapticPattern="light" label="Tap" />

<!-- Medium haptic -->
<Switch bind:value={enabled} hapticFeedback={true} hapticPattern="medium" label="Touch" />

<!-- Heavy haptic -->
<Switch bind:value={enabled} hapticFeedback={true} hapticPattern="heavy" label="Strong" />

<!-- Custom vibration pattern (ms) -->
<Switch
  bind:value={enabled}
  hapticFeedback={true}
  hapticPattern={[15, 5, 15, 5, 30]}
  label="Pattern"
/>
```

### 💀 Skeleton Loading

Beautiful loading placeholders while fetching data.

```svelte
<!-- Shimmer animation (default) -->
<Switch bind:value={enabled} skeleton={isLoading} skeletonAnimation="shimmer" label="Settings" />

<!-- Pulse animation -->
<Switch bind:value={enabled} skeleton={isLoading} skeletonAnimation="pulse" label="Loading..." />

<!-- Wave animation -->
<Switch bind:value={enabled} skeleton={isLoading} skeletonAnimation="wave" label="Fetching..." />
```

### 💬 Tooltip Support

Built-in tooltips to provide additional context.

```svelte
<!-- Top tooltip (default) -->
<Switch bind:value={enabled} tooltip="Enable this feature" tooltipPosition="top" label="Feature" />

<!-- Bottom tooltip -->
<Switch bind:value={enabled} tooltip="Affects all users" tooltipPosition="bottom" label="Global" />

<!-- Left/right tooltips -->
<Switch bind:value={enabled} tooltip="Warning!" tooltipPosition="left" label="Danger" />
<Switch bind:value={enabled} tooltip="Info" tooltipPosition="right" label="Setting" />

<!-- Custom delay -->
<Switch bind:value={enabled} tooltip="Quick tip" tooltipDelay={100} label="Fast" />
```

## New in v2.2.0

### 🌙 Dark Mode Support

Automatically adapt to system theme or manually control dark mode colors.

```svelte
<!-- Auto-detect system theme -->
<Switch bind:value={enabled} darkMode="auto" label="Notifications" />

<!-- Always use dark mode -->
<Switch bind:value={enabled} darkMode={true} label="Wi-Fi" />

<!-- Combine with gradients -->
<Switch
  bind:value={enabled}
  darkMode={true}
  gradient={true}
  gradientPreset="berry"
  label="Premium mode"
/>
```

### 🌈 Gradient Colors

Add beautiful gradient backgrounds with built-in presets or custom gradients.

```svelte
<!-- Built-in gradient presets -->
<Switch bind:value={enabled} gradient={true} gradientPreset="sunset" />
<Switch bind:value={enabled} gradient={true} gradientPreset="ocean" />
<Switch bind:value={enabled} gradient={true} gradientPreset="forest" />
<Switch bind:value={enabled} gradient={true} gradientPreset="berry" />
<Switch bind:value={enabled} gradient={true} gradientPreset="fire" />

<!-- Custom gradient -->
<Switch
  bind:value={enabled}
  gradient={true}
  gradientPreset="custom"
  customGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
/>
```

### 👆 Touch Gesture Support

Enable swipe-to-toggle for mobile-friendly interactions.

```svelte
<!-- Enable swipe to toggle -->
<Switch bind:value={enabled} swipeToToggle={true} label="Notifications" />

<!-- Custom swipe threshold -->
<Switch
  bind:value={enabled}
  swipeToToggle={true}
  swipeThreshold={30}
  label="Quick toggle"
/>
```

### 🌐 RTL (Right-to-Left) Support

Full support for Arabic, Hebrew, Persian, and other RTL languages.

```svelte
<!-- Manual RTL direction -->
<Switch bind:value={enabled} dir="rtl" label="إعدادات" />

<!-- Auto-detect direction -->
<Switch bind:value={enabled} dir="auto" label="Settings" />

<!-- RTL with icons -->
<Switch
  bind:value={enabled}
  dir="rtl"
  design="modern"
  showIcons={true}
  label="مزامنة"
/>
```

## Design Variants

### Slider (iOS Style)
The default design, inspired by iOS toggles.

```svelte
<Switch bind:value={enabled} label="Enable dark mode" design="slider" />
```

### Inner
Toggle with visible ON/OFF text inside the button.

```svelte
<Switch bind:value={enabled} label="Auto-save" design="inner" />
```

### Modern
Enhanced slider with optional icon displays on the track.

```svelte
<Switch
  bind:value={enabled}
  label="Wi-Fi"
  design="modern"
  showIcons={true}
  onIcon="✓"
  offIcon="✕"
/>
```

### Material
Google Material Design inspired toggle.

```svelte
<Switch bind:value={enabled} label="Bluetooth" design="material" />
```

### Multi-option
Radio group styled as a segmented control.

```svelte
<Switch
  bind:value={selectedOption}
  label="View mode"
  design="multi"
  options={['Grid', 'List', 'Table']}
/>
```

## Color Schemes

6 built-in color schemes plus custom color support.

```svelte
<!-- Built-in schemes -->
<Switch bind:value={enabled} colorScheme="blue" />
<Switch bind:value={enabled} colorScheme="green" />
<Switch bind:value={enabled} colorScheme="red" />
<Switch bind:value={enabled} colorScheme="purple" />
<Switch bind:value={enabled} colorScheme="orange" />
<Switch bind:value={enabled} colorScheme="pink" />

<!-- Custom colors -->
<Switch
  bind:value={enabled}
  colorScheme="custom"
  color="#FF6B6B"
  offColor="#F0F0F0"
/>
```

## Size Variants

```svelte
<Switch bind:value={enabled} size="xs" label="Extra Small" />
<Switch bind:value={enabled} size="sm" label="Small" />
<Switch bind:value={enabled} size="md" label="Medium (Default)" />
<Switch bind:value={enabled} size="lg" label="Large" />
<Switch bind:value={enabled} size="xl" label="Extra Large" />

<!-- Custom size (in rem) -->
<Switch bind:value={enabled} size={2} label="Custom Size" />
```

## States

### Disabled
```svelte
<Switch bind:value={enabled} label="Disabled" disabled />
```

### Loading
Shows a spinner animation.

```svelte
<Switch bind:value={enabled} label="Loading..." loading />
```

### Read-only
Displays current state without allowing changes.

```svelte
<Switch bind:value={enabled} label="Read-only" readonly />
```

## Icons

Add custom icons to your toggles.

```svelte
<!-- Slider with icons -->
<Switch
  bind:value={enabled}
  label="Theme"
  showIcons={true}
  onIcon="🌙"
  offIcon="☀"
/>

<!-- Modern design with track icons -->
<Switch
  bind:value={enabled}
  label="Airplane Mode"
  design="modern"
  showIcons={true}
  onIcon="✈"
  offIcon="✕"
/>
```

## Advanced Customization

### Label Position
```svelte
<Switch
  bind:value={enabled}
  label="Label on left"
  labelPosition="left"
/>
```

### Visual Enhancements
```svelte
<!-- With shadow -->
<Switch bind:value={enabled} label="Shadow effect" shadow />

<!-- With outline -->
<Switch bind:value={enabled} label="Outline style" outline />

<!-- Without rounded corners (inner design only) -->
<Switch bind:value={enabled} design="inner" rounded={false} />
```

### Custom Animations
```svelte
<Switch
  bind:value={enabled}
  label="Custom animation"
  animationDuration={800}
  animationEasing="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
/>
```

### Accessibility Props
```svelte
<Switch
  bind:value={enabled}
  id="custom-id"
  ariaLabel="Toggle notifications"
  ariaDescribedBy="notification-description"
/>
```

## Complete API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean \| string` | `false` | Current value (use with `bind:value`) |
| `label` | `string` | `''` | Label text displayed next to the switch |
| `design` | `'inner' \| 'slider' \| 'modern' \| 'ios' \| 'material' \| 'multi'` | `'slider'` | Visual design variant |
| `options` | `string[]` | `[]` | Options array (required for `multi` design) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Size variant or custom size in rem |
| `color` | `string` | `'#007AFF'` | Custom active color (CSS color value) |
| `offColor` | `string` | `'#E5E7EB'` | Custom inactive color (CSS color value) |
| `colorScheme` | `'blue' \| 'green' \| 'red' \| 'purple' \| 'orange' \| 'pink' \| 'custom'` | `'blue'` | Built-in color scheme |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `readonly` | `boolean` | `false` | Makes switch read-only |
| `showIcons` | `boolean` | `false` | Display icons on the switch |
| `onIcon` | `string` | `'✓'` | Icon shown when active |
| `offIcon` | `string` | `'✕'` | Icon shown when inactive |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |
| `animationEasing` | `string` | `'ease-in-out'` | CSS easing function |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `''` | ARIA described-by attribute |
| `id` | `string` | auto-generated | Custom element ID |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of the label |
| `rounded` | `boolean` | `true` | Use rounded corners (inner design) |
| `shadow` | `boolean` | `false` | Add box shadow |
| `outline` | `boolean` | `false` | Add border outline |
| `darkMode` | `boolean \| 'auto'` | `false` | Dark mode: `true`, `false`, or `'auto'` to detect system theme (v2.2.0) |
| `gradient` | `boolean` | `false` | Enable gradient colors (v2.2.0) |
| `gradientPreset` | `'sunset' \| 'ocean' \| 'forest' \| 'berry' \| 'fire' \| 'custom'` | `'sunset'` | Gradient preset (v2.2.0) |
| `customGradient` | `string` | `''` | Custom CSS gradient when `gradientPreset='custom'` (v2.2.0) |
| `swipeToToggle` | `boolean` | `false` | Enable swipe gesture to toggle (mobile) (v2.2.0) |
| `swipeThreshold` | `number` | `50` | Swipe distance in pixels to trigger toggle (v2.2.0) |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `'auto'` | Text direction for RTL support (v2.2.0) |
| `pulse` | `boolean` | `false` | Enable pulse animation (v2.3.0) |
| `pulseIntensity` | `'subtle' \| 'normal' \| 'strong'` | `'normal'` | Pulse animation intensity (v2.3.0) |
| `pulseColor` | `string` | `''` | Custom pulse glow color (v2.3.0) |
| `showSuccessAnimation` | `boolean` | `false` | Show checkmark animation on toggle (v2.3.0) |
| `showErrorAnimation` | `boolean` | `false` | Show shake animation on error (v2.3.0) |
| `successDuration` | `number` | `1500` | Duration of success animation in ms (v2.3.0) |
| `hapticFeedback` | `boolean` | `false` | Enable vibration on mobile (v2.3.0) |
| `hapticPattern` | `'light' \| 'medium' \| 'heavy' \| number[]` | `'light'` | Haptic vibration pattern (v2.3.0) |
| `skeleton` | `boolean` | `false` | Show skeleton loading state (v2.3.0) |
| `skeletonAnimation` | `'shimmer' \| 'pulse' \| 'wave'` | `'shimmer'` | Skeleton animation type (v2.3.0) |
| `tooltip` | `string` | `''` | Tooltip text to display on hover (v2.3.0) |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position (v2.3.0) |
| `tooltipDelay` | `number` | `300` | Delay before showing tooltip in ms (v2.3.0) |

## Accessibility

This component follows WAI-ARIA best practices:

- Proper `role="switch"` and `role="radiogroup"` attributes
- `aria-checked` state management
- `aria-labelledby` and `aria-describedby` support
- Full keyboard navigation (Space and Enter keys)
- Focus indicators with `:focus-visible`
- Screen reader friendly
- Disabled state properly communicated

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome for Android (latest)

## TypeScript

This package includes TypeScript definitions. All props are fully typed for the best development experience.

```typescript
import type { ComponentProps } from 'svelte';
import Switch from 'svelte-toggle-switch';

type SwitchProps = ComponentProps<Switch>;
```

## Examples

### Dark Mode Toggle
```svelte
<script>
  let darkMode = false;

  $: if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
</script>

<Switch
  bind:value={darkMode}
  label="Dark mode"
  showIcons={true}
  onIcon="🌙"
  offIcon="☀"
  colorScheme="purple"
/>
```

### Form Integration
```svelte
<script>
  let formData = {
    notifications: false,
    marketing: false,
    newsletter: true
  };
</script>

<form>
  <Switch bind:value={formData.notifications} label="Push notifications" />
  <Switch bind:value={formData.marketing} label="Marketing emails" />
  <Switch bind:value={formData.newsletter} label="Newsletter" />
</form>
```

### Async Toggle
```svelte
<script>
  let enabled = false;
  let loading = false;

  async function handleToggle() {
    loading = true;
    try {
      await api.updateSetting(enabled);
    } catch (error) {
      // Revert on error
      enabled = !enabled;
    } finally {
      loading = false;
    }
  }

  $: if (enabled !== undefined) {
    handleToggle();
  }
</script>

<Switch bind:value={enabled} {loading} label="Enable feature" />
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Ishan Karunaratne](https://github.com/ishansasika)

## Repository

[GitHub Repository](https://github.com/ishansasika/svelte-toggle-switch)

## Changelog

### Version 2.3.0 (Latest)

**New Features** - Enhanced animations and user feedback:

- 💫 **Pulse Animation**: Draw attention with subtle/normal/strong glow effects
- ✅ **Success Animation**: Checkmark animation on successful toggle
- 📳 **Haptic Feedback**: Vibration patterns on mobile devices
- 💀 **Skeleton Loading**: Shimmer/pulse/wave loading placeholders
- 💬 **Tooltip Support**: Built-in tooltips with 4 positions
- 🎨 Custom pulse colors and animation durations
- 📱 Custom haptic vibration patterns

### Version 2.2.0

**New Features** - Enhanced mobile experience and theming:

- 🌙 **Dark Mode Support**: Auto-detect system theme or manual control
- 🌈 **Gradient Colors**: 5 beautiful gradient presets + custom gradients
- 👆 **Touch Gestures**: Swipe to toggle on mobile devices
- 🌐 **RTL Support**: Full right-to-left language support for international users
- 🎨 Dark color variants for all 9 color schemes
- ⚡ Optimized animations for touch interactions

### Version 2.1.0

**Form Integration & Events**:

- 📤 Event dispatchers (`on:change`, `on:focus`, `on:blur`)
- 📝 Form validation support (helperText, errorText, required, error props)
- 🎨 Added 3 new color schemes (yellow, indigo, teal)
- ♿ Enhanced accessibility with form validation states

### Version 2.0.0

**Major Rewrite** - Complete redesign with modern features:

- ✨ Added TypeScript support
- ✨ Added 3 new design variants (Modern, Material, Multi)
- ✨ Added 6 built-in color schemes + custom colors
- ✨ Added 5 size variants (xs, sm, md, lg, xl)
- ✨ Added loading state with spinner animation
- ✨ Added icon support with custom positioning
- ✨ Added disabled and read-only states
- ✨ Added customizable animations
- ✨ Added shadow and outline options
- ✨ Added label positioning (left/right)
- ✨ Enhanced accessibility (ARIA, keyboard navigation)
- 📦 Updated to Svelte 5, Vite 6, TypeScript 5
- 🎨 Complete UI/UX improvements
- 📚 Comprehensive documentation

### Version 1.0.0

- Initial release with basic toggle functionality
