# Svelte Toggle Switch

A comprehensive, accessible, and highly customizable toggle switch component for Svelte applications. Built with TypeScript and designed with accessibility in mind.

## Features

✨ **5 Design Variants**: Slider (iOS), Inner, Modern, Material, and Multi-option\
🎨 **Multiple Color Schemes**: 6 built-in schemes + custom colors\
📏 **5 Size Options**: From extra small to extra large\
♿ **Fully Accessible**: ARIA attributes, keyboard navigation, screen reader support\
🔄 **State Management**: Disabled, loading, and read-only states\
🎯 **Icon Support**: Custom icons with flexible positioning\
⚡ **Smooth Animations**: Customizable duration and easing\
📦 **TypeScript**: Full TypeScript support with proper types\
🎭 **Flexible Styling**: Shadow, outline, and label positioning options\
🚀 **Modern Stack**: Built with Svelte 5, Vite 6, and TypeScript 5

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

### Version 2.0.0 (Latest)

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
