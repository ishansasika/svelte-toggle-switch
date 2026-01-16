# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an NPM package providing a comprehensive, accessible toggle switch component for Svelte applications. The package has been completely rewritten in version 2.0 with TypeScript support, multiple design variants, extensive customization options, and enhanced accessibility features.

### Version 2.3.0 Features
- **Pulse Animation**: Attention-grabbing glow effects with subtle/normal/strong intensity
- **Success/Error Animations**: Visual feedback with checkmark animation and shake effects
- **Haptic Feedback**: Vibration patterns on mobile devices (light/medium/heavy/custom)
- **Skeleton Loading**: Shimmer/pulse/wave loading placeholders
- **Tooltip Support**: Built-in tooltips with 4 position options

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build the package for distribution
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run check
```

## Tech Stack

- **Svelte 5.16.0**: Latest Svelte with runes support
- **TypeScript 5.7.3**: Full type safety
- **Vite 6.0.5**: Fast build tooling
- **svelte-check**: TypeScript checking for Svelte files

## Architecture

### Component Structure

The main component is located at `src/lib/Switch.svelte`. This single component supports five distinct design variants controlled by the `design` prop:

- **slider/ios**: iOS-style toggle switch (default)
- **inner**: Toggle button with visible ON/OFF text
- **modern**: Enhanced slider with optional track icons
- **material**: Google Material Design inspired toggle
- **multi**: Radio group styled as a segmented control

### Component API Design

The component uses a comprehensive props-based API with full TypeScript support:

#### Core Props
- `value`: Two-way bound state (boolean or string for multi design)
- `label`: Accessible label text
- `design`: Design variant selector

#### Styling System
- **Color Schemes**: 6 built-in schemes (blue, green, red, purple, orange, pink) + custom
- **Size Variants**: xs, sm, md, lg, xl (mapped to rem values) or custom number
- **Visual Options**: shadow, outline, rounded, labelPosition

#### State Management
- `disabled`: Prevents interaction, shows disabled UI
- `loading`: Shows spinner animation, prevents interaction
- `readonly`: Prevents changes but shows current state

#### Icon System
- `showIcons`: Enable icon display
- `onIcon`/`offIcon`: Customizable icons (text/emoji/symbols)
- Icons displayed differently per design variant

#### Animation Customization
- `animationDuration`: Transition duration in ms (default 300)
- `animationEasing`: CSS easing function (default 'ease-in-out')

#### v2.3.0 Features
- `pulse`: Enable pulsing glow animation
- `pulseIntensity`: Pulse strength ('subtle'/'normal'/'strong')
- `pulseColor`: Custom glow color
- `showSuccessAnimation`: Enable checkmark animation on toggle
- `showErrorAnimation`: Enable shake animation on error
- `successDuration`: Duration of success animation (default 1500ms)
- `hapticFeedback`: Enable vibration on mobile
- `hapticPattern`: Vibration pattern ('light'/'medium'/'heavy'/custom array)
- `skeleton`: Show loading placeholder
- `skeletonAnimation`: Loading animation type ('shimmer'/'pulse'/'wave')
- `tooltip`: Tooltip text to show on hover
- `tooltipPosition`: Position ('top'/'bottom'/'left'/'right')
- `tooltipDelay`: Delay before showing tooltip (default 300ms)

#### Accessibility
- `ariaLabel`: Custom ARIA label
- `ariaDescribedBy`: Links to description element
- `id`: Custom element ID (auto-generated if not provided)

### State Management

The component uses Svelte's reactive statements (`$:`) to sync internal and external state:

1. **For slider/inner/modern/material designs**:
   - Internal `checked` boolean tracks state
   - Syncs with `value` prop (boolean or 'on'/'off' string)
   - Two-way binding via `bind:value`

2. **For multi design**:
   - Uses native radio input `bind:group`
   - Value is one of the strings from `options` array
   - No internal checked state needed

3. **Unique IDs**:
   - Auto-generated using `Math.floor(Math.random() * 1000000)`
   - Used for ARIA attributes (`aria-labelledby`, `id` attributes)
   - Can be overridden via `id` prop

### Accessibility Implementation

Comprehensive ARIA and keyboard support:

- **ARIA Roles**: `role="switch"` for toggles, `role="radiogroup"` for multi
- **State Attributes**: `aria-checked` reflects current state
- **Labeling**: `aria-labelledby` connects visual labels, `aria-describedby` for descriptions
- **Keyboard Navigation**: Space and Enter keys toggle state
- **Focus Management**: `:focus-visible` for keyboard-only focus rings
- **Disabled State**: Properly communicated to assistive technologies

### Styling Architecture

All styles are scoped within the component using Svelte's `<style>` block:

- **CSS Custom Properties**: Used for theming (`--active-color`, `--off-color`, `--animation-duration`, `--animation-easing`)
- **Design-Specific Classes**: `.switch--slider`, `.switch--inner`, `.switch--modern`, `.switch--material`, `.switch-multi`
- **State Classes**: `.checked`, `.disabled`, `.loading`, `.shadow`, `.outline`
- **Conditional Rendering**: `{#if design === 'variant'}` blocks for each design
- **No External Dependencies**: Self-contained styling, no CSS framework required

### TypeScript Integration

The component is written in TypeScript (`<script lang="ts">`):

- All props have explicit type annotations
- Union types for variant options (design, size, colorScheme)
- Event handlers properly typed (MouseEvent, KeyboardEvent)
- Exported types available for consumers

### Demo Application

`src/App.svelte` serves as a comprehensive showcase of all component features:

- Organized into sections by feature category
- Interactive examples with state display
- Beautiful gradient background with card-based layout
- Responsive design for mobile devices
- Not included in the distributed package (development only)

## Build Configuration

### Vite Config
- Library mode enabled with entry point `src/lib/Switch.svelte`
- Package name: 'SvelteToggleSwitch'
- Standard Svelte plugin configuration

### TypeScript Config
- Extends `@tsconfig/svelte` base configuration
- ESNext target for modern JavaScript
- Includes all `.svelte`, `.ts`, `.js`, and `.d.ts` files in `src/`
- Composite project with references to `tsconfig.node.json`

### Package Configuration
- Version 2.0.0 (major rewrite)
- Peer dependency: Svelte 3.x, 4.x, or 5.x
- Development dependencies all on latest versions
- MIT licensed

## Key Design Decisions

1. **Single Component Approach**: All variants in one component file for easier maintenance
2. **CSS-in-JS via Custom Properties**: Enables dynamic theming without style duplication
3. **Progressive Enhancement**: Basic functionality without JavaScript, enhanced with interactivity
4. **Accessibility First**: ARIA and keyboard support built-in, not added later
5. **TypeScript Throughout**: Type safety for better DX and fewer runtime errors
6. **Zero Dependencies**: No runtime dependencies beyond Svelte peer dependency
