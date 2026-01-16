# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2026-01-16

### Fixed
- Optimized npm package size from 1.6MB to 15KB (99% reduction)
- Fixed `index.js` entry point referencing wrong component
- Updated `.npmignore` to exclude dev files, old tarballs, and build artifacts

## [2.3.0] - 2026-01-16

### Added
- **Pulse Animation**:
  - `pulse` prop to enable attention-grabbing glow effect
  - `pulseIntensity` prop with `'subtle'`, `'normal'`, and `'strong'` options
  - `pulseColor` prop for custom glow color
  - CSS keyframe animations with color-mix for smooth gradients
  - Works across all 5 design variants
- **Success Animation**:
  - `showSuccessAnimation` prop to enable visual feedback on toggle
  - Animated checkmark icon with pop effect
  - `successDuration` prop to customize animation length (default 1500ms)
  - Green success state with smooth transitions
- **Error Animation**:
  - `showErrorAnimation` prop for shake effect on failed operations
  - Horizontal shake keyframe animation
  - Useful for async toggle operations that may fail
- **Haptic Feedback**:
  - `hapticFeedback` prop to enable vibration on mobile devices
  - `hapticPattern` prop with presets: `'light'` (10ms), `'medium'` (20ms), `'heavy'` (30-10-30ms)
  - Custom pattern support via number array (e.g., `[15, 5, 15, 5, 30]`)
  - Uses Vibration API with graceful fallback
- **Skeleton Loading State**:
  - `skeleton` prop to show loading placeholder instead of switch
  - `skeletonAnimation` prop with `'shimmer'`, `'pulse'`, and `'wave'` options
  - Design-specific skeleton sizes matching each variant
  - Dark mode aware skeleton colors
  - Label text also shows skeleton state
- **Tooltip Support**:
  - `tooltip` prop to show hover tooltip text
  - `tooltipPosition` prop with `'top'`, `'bottom'`, `'left'`, `'right'` options
  - `tooltipDelay` prop to customize show delay (default 300ms)
  - Arrow pointer indicating switch
  - Smooth fade-in animation
- **Demo Application Enhancements**:
  - Dedicated v2.3.0 features showcase section with green gradient theme
  - 20+ interactive examples for new features
  - Combined features demonstration
  - Reload button for skeleton demo
  - Feature descriptions for each section

### Changed
- Updated all click/touch handlers to respect skeleton state
- Enhanced internal state management for animations
- Added switch-wrapper element for tooltip positioning
- Improved CSS architecture with v2.3.0 comment sections

### Technical
- Added presentation role to container for accessibility
- Implemented SSR-safe navigator checks for haptic feedback
- Created animation keyframes for pulse, success, error, and skeleton
- Added tooltip positioning with CSS transforms
- Maintained full backward compatibility with v2.2.0

## [2.2.0] - 2026-01-06

### Added
- **Dark Mode Support**:
  - `darkMode` prop with `true`, `false`, or `'auto'` options
  - Auto-detection of system theme using `prefers-color-scheme` media query
  - Dynamic theme switching with real-time event listeners
  - Dark color variants for all 9 color schemes (blue, green, red, purple, orange, pink, yellow, indigo, teal)
  - Dark mode aware label and helper text colors
- **Gradient Colors**:
  - `gradient` prop to enable gradient backgrounds
  - 5 built-in gradient presets: sunset, ocean, forest, berry, fire
  - `gradientPreset` prop to select from presets or use custom
  - `customGradient` prop for custom CSS gradient support
  - Gradient support across all design variants (slider, inner, modern, material, multi)
- **Touch Gesture Support**:
  - `swipeToToggle` prop to enable swipe-to-toggle on mobile
  - Touch event handlers (touchstart, touchmove, touchend)
  - `swipeThreshold` prop to customize swipe distance (default 50px)
  - Visual feedback with dragging state showing thumb following finger
  - RTL-aware swipe direction handling
- **RTL (Right-to-Left) Support**:
  - `dir` prop with `'ltr'`, `'rtl'`, or `'auto'` options
  - Auto-detection of document text direction
  - Mirrored animations and transforms for RTL layouts
  - Touch gesture direction adjustment for RTL
  - Full support for Arabic, Hebrew, Persian, and other RTL languages
- **Demo Application Enhancements**:
  - Dedicated v2.2.0 features showcase section
  - 15+ interactive examples for new features
  - Beautiful gradient-themed feature highlight section
  - Mobile-friendly responsive design updates

### Changed
- Updated all design variants to support gradient backgrounds
- Enhanced CSS transforms to work correctly in RTL layouts
- Improved animation performance for touch interactions
- Updated demo application footer with v2.2.0 version information

### Technical
- Added SSR-safe window and document checks for all new features
- Implemented reactive color determination with dark mode awareness
- Added CSS custom properties for drag offset in touch gestures
- Enhanced CSS with 200+ new lines for feature support
- Maintained full backward compatibility with v2.1.0

## [2.1.0] - 2026-01-02

### Added
- **Event Dispatchers**: Added `on:change`, `on:focus`, and `on:blur` event handlers for better integration with frameworks and form libraries
- **Custom Text Labels**: New `onText` and `offText` props to customize the text displayed in the inner design (default: "ON"/"OFF")
- **Form Validation Support**:
  - `helperText` prop - Display helper text below the switch
  - `errorText` prop - Display error message when validation fails
  - `required` prop - Mark the switch as required
  - `error` prop - Show error state with red styling
  - `name` prop - Form field name for submission
- **New Color Schemes**: Added `yellow`, `indigo`, and `teal` color schemes (now 9 total color schemes)
- **Enhanced Accessibility**:
  - `tabIndex` prop for custom keyboard navigation order
  - `aria-required` and `aria-invalid` attributes for form validation
  - Improved screen reader support with helper text announcements
- **Demo Application**: Comprehensive SvelteKit demo with interactive playground at svelte-toggle-switch.ishansasika.dev
  - Live preview with all props
  - Real-time code generation
  - 15+ quick example presets
  - Icon picker with 10+ preset icons
  - Complete documentation

### Changed
- Updated component to dispatch custom events with detailed payload
- Multi-select now dispatches change events properly
- Helper text and error text display dynamically below all switch designs
- Error state now includes visual border color change

### Fixed
- Multi-select change events now trigger correctly
- Focus and blur events properly propagate
- ARIA attributes correctly reference helper text for screen readers

## [2.0.0] - 2025-12-14

### Added
- Complete rewrite with TypeScript support
- 5 design variants (slider/ios, inner, modern, material, multi)
- 6 color schemes (blue, green, red, purple, orange, pink)
- 5 size variants (xs, sm, md, lg, xl)
- Custom icon support with showIcons, onIcon, and offIcon props
- Comprehensive accessibility with ARIA attributes
- Loading and disabled states
- Shadow and outline visual effects
- Customizable animations (duration and easing)
- Label positioning (left/right)
- Multi-option mode with radio group styling

### Breaking Changes
- Migrated from Svelte 4 to Svelte 5 with runes support
- Component props now use TypeScript types
- Removed deprecated v1.x props

## [1.0.0] - 2022-05-29

### Added
- Initial release
- Basic toggle switch functionality
- iOS-style design
- ON/OFF states
- Simple customization options
