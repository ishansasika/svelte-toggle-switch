import type { ComponentMetadata } from '$lib/types';
import Switch from '@switch/Switch.svelte';

export const SWITCH_METADATA: ComponentMetadata = {
	id: 'switch',
	name: 'Switch',
	description:
		'A comprehensive, accessible toggle switch component with 5 design variants, color themes, and extensive customization options',
	component: Switch,
	defaultProps: {
		value: false,
		label: 'Toggle Switch',
		design: 'slider',
		size: 'md',
		colorScheme: 'blue',
		disabled: false,
		loading: false,
		readonly: false,
		showIcons: false,
		onIcon: '✓',
		offIcon: '✕',
		animationDuration: 300,
		animationEasing: 'ease-in-out',
		labelPosition: 'right',
		rounded: true,
		shadow: false,
		outline: false,
		// v2.1.0 new props
		onText: 'ON',
		offText: 'OFF',
		helperText: '',
		errorText: '',
		required: false,
		error: false,
		name: '',
		tabIndex: 0
	},
	propDefinitions: [
		// Basic Props
		{
			name: 'design',
			type: 'string',
			control: {
				type: 'select',
				options: ['slider', 'ios', 'inner', 'modern', 'material', 'multi']
			},
			description: 'Design variant of the switch',
			defaultValue: 'slider',
			category: 'basic'
		},
		{
			name: 'label',
			type: 'string',
			control: { type: 'text' },
			description: 'Label text for the switch',
			defaultValue: 'Toggle Switch',
			category: 'basic'
		},
		{
			name: 'labelPosition',
			type: 'string',
			control: {
				type: 'select',
				options: ['left', 'right']
			},
			description: 'Position of the label',
			defaultValue: 'right',
			category: 'basic'
		},
		{
			name: 'disabled',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Disable the switch',
			defaultValue: false,
			category: 'basic'
		},
		{
			name: 'loading',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show loading spinner',
			defaultValue: false,
			category: 'basic'
		},
		{
			name: 'readonly',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Make switch read-only',
			defaultValue: false,
			category: 'basic'
		},

		// Styling Props
		{
			name: 'size',
			type: 'string',
			control: {
				type: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			description: 'Size variant',
			defaultValue: 'md',
			category: 'styling'
		},
		{
			name: 'colorScheme',
			type: 'string',
			control: {
				type: 'select',
				options: ['blue', 'green', 'red', 'purple', 'orange', 'pink', 'yellow', 'indigo', 'teal', 'custom']
			},
			description: 'Color scheme (v2.1.0 - added yellow, indigo, teal)',
			defaultValue: 'blue',
			category: 'styling'
		},
		{
			name: 'color',
			type: 'string',
			control: { type: 'color' },
			description: 'Custom active color (when colorScheme is "custom")',
			defaultValue: '#007AFF',
			category: 'styling'
		},
		{
			name: 'offColor',
			type: 'string',
			control: { type: 'color' },
			description: 'Off state color',
			defaultValue: '#E5E7EB',
			category: 'styling'
		},
		{
			name: 'rounded',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Rounded corners',
			defaultValue: true,
			category: 'styling'
		},
		{
			name: 'shadow',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Add shadow effect',
			defaultValue: false,
			category: 'styling'
		},
		{
			name: 'outline',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Add outline/border',
			defaultValue: false,
			category: 'styling'
		},

		// Icon Props
		{
			name: 'showIcons',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show icons on switch',
			defaultValue: false,
			category: 'icons'
		},
		{
			name: 'onIcon',
			type: 'string',
			control: {
				type: 'select',
				options: [
					{ label: '✓ Check', value: '✓' },
					{ label: '✔️ Check Mark', value: '✔️' },
					{ label: '👍 Thumbs Up', value: '👍' },
					{ label: '🌙 Moon', value: '🌙' },
					{ label: '❤️ Heart', value: '❤️' },
					{ label: '⭐ Star', value: '⭐' },
					{ label: '🔥 Fire', value: '🔥' },
					{ label: '💡 Bulb', value: '💡' },
					{ label: '🎵 Music', value: '🎵' },
					{ label: '📧 Mail', value: '📧' },
					{ label: 'Custom', value: 'custom' }
				]
			},
			description: 'Icon to show when ON',
			defaultValue: '✓',
			category: 'icons'
		},
		{
			name: 'offIcon',
			type: 'string',
			control: {
				type: 'select',
				options: [
					{ label: '✕ X', value: '✕' },
					{ label: '✖️ X Mark', value: '✖️' },
					{ label: '👎 Thumbs Down', value: '👎' },
					{ label: '☀️ Sun', value: '☀️' },
					{ label: '💔 Broken Heart', value: '💔' },
					{ label: '⚫ Circle', value: '⚫' },
					{ label: '❄️ Snowflake', value: '❄️' },
					{ label: '🔇 Mute', value: '🔇' },
					{ label: '🎵 Music Off', value: '🎵' },
					{ label: '📪 Mail Empty', value: '📪' },
					{ label: 'Custom', value: 'custom' }
				]
			},
			description: 'Icon to show when OFF',
			defaultValue: '✕',
			category: 'icons'
		},

		// Animation Props
		{
			name: 'animationDuration',
			type: 'number',
			control: {
				type: 'range',
				min: 0,
				max: 1000,
				step: 50
			},
			description: 'Animation duration in milliseconds',
			defaultValue: 300,
			category: 'animation'
		},
		{
			name: 'animationEasing',
			type: 'string',
			control: {
				type: 'select',
				options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear']
			},
			description: 'Animation easing function',
			defaultValue: 'ease-in-out',
			category: 'animation'
		},

		// v2.1.0 - Text Labels
		{
			name: 'onText',
			type: 'string',
			control: { type: 'text' },
			description: 'Custom text for ON state (inner design)',
			defaultValue: 'ON',
			category: 'advanced'
		},
		{
			name: 'offText',
			type: 'string',
			control: { type: 'text' },
			description: 'Custom text for OFF state (inner design)',
			defaultValue: 'OFF',
			category: 'advanced'
		},

		// v2.1.0 - Form Validation
		{
			name: 'helperText',
			type: 'string',
			control: { type: 'text' },
			description: 'Helper text displayed below switch',
			defaultValue: '',
			category: 'advanced'
		},
		{
			name: 'errorText',
			type: 'string',
			control: { type: 'text' },
			description: 'Error message (shown when error=true)',
			defaultValue: '',
			category: 'advanced'
		},
		{
			name: 'required',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Mark field as required',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'error',
			type: 'boolean',
			control: { type: 'boolean' },
			description: 'Show error state',
			defaultValue: false,
			category: 'advanced'
		},
		{
			name: 'name',
			type: 'string',
			control: { type: 'text' },
			description: 'Form field name',
			defaultValue: '',
			category: 'advanced'
		},
		{
			name: 'tabIndex',
			type: 'number',
			control: { type: 'number' },
			description: 'Tab index for keyboard navigation',
			defaultValue: 0,
			category: 'advanced'
		}
	],
	examples: [
		{
			name: 'iOS Style',
			description: 'Classic iOS toggle switch',
			props: { design: 'ios', colorScheme: 'blue' }
		},
		{
			name: 'Inner Text',
			description: 'Toggle with ON/OFF text',
			props: { design: 'inner', colorScheme: 'green' }
		},
		{
			name: 'Modern',
			description: 'Modern design with icons',
			props: { design: 'modern', showIcons: true, colorScheme: 'purple' }
		},
		{
			name: 'Material',
			description: 'Material Design inspired',
			props: { design: 'material', colorScheme: 'orange' }
		},
		{
			name: 'Multi Option',
			description: 'Multiple options as segmented control',
			props: { design: 'multi', options: ['Option 1', 'Option 2', 'Option 3'], value: 'Option 1' }
		},
		{
			name: 'With Shadow',
			description: 'Switch with shadow effect',
			props: { shadow: true, colorScheme: 'red' }
		},
		{
			name: 'Large Size',
			description: 'Extra large switch',
			props: { size: 'xl', colorScheme: 'pink' }
		},
		{
			name: 'Loading State',
			description: 'Switch in loading state',
			props: { loading: true, colorScheme: 'blue' }
		},
		// v2.1.0 New Examples
		{
			name: 'Yellow Theme',
			description: 'New yellow color scheme',
			props: { colorScheme: 'yellow' }
		},
		{
			name: 'Indigo Theme',
			description: 'New indigo color scheme',
			props: { colorScheme: 'indigo' }
		},
		{
			name: 'Teal Theme',
			description: 'New teal color scheme',
			props: { colorScheme: 'teal' }
		},
		{
			name: 'Custom Text',
			description: 'Custom ON/OFF text',
			props: { design: 'inner', onText: 'YES', offText: 'NO', colorScheme: 'green' }
		},
		{
			name: 'With Helper Text',
			description: 'Switch with helper text',
			props: { helperText: 'Enable this option to receive notifications', colorScheme: 'blue' }
		},
		{
			name: 'Error State',
			description: 'Switch in error state',
			props: { error: true, errorText: 'This field is required', required: true, outline: true }
		},
		{
			name: 'Custom Icons',
			description: 'Day/Night mode toggle',
			props: { showIcons: true, onIcon: '🌙', offIcon: '☀️', colorScheme: 'indigo', label: 'Dark Mode' }
		}
	],
	importPath: "import Switch from 'svelte-toggle-switch';"
};
