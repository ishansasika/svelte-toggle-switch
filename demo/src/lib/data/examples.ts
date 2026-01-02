import type { Example } from '$lib/types';

export const basicExamples: Example[] = [
	{
		name: 'Basic Toggle',
		description: 'Simple on/off switch',
		props: {
			label: 'Enable notifications',
			value: false
		}
	},
	{
		name: 'Pre-checked',
		description: 'Switch that starts enabled',
		props: {
			label: 'Dark mode',
			value: true
		}
	},
	{
		name: 'Disabled',
		description: 'Disabled switch',
		props: {
			label: 'Disabled option',
			value: false,
			disabled: true
		}
	},
	{
		name: 'Loading',
		description: 'Switch in loading state',
		props: {
			label: 'Processing...',
			value: true,
			loading: true
		}
	}
];

export const designExamples: Example[] = [
	{
		name: 'Slider (iOS)',
		description: 'Classic iOS-style slider',
		props: {
			design: 'slider',
			label: 'iOS Style',
			colorScheme: 'blue'
		}
	},
	{
		name: 'Inner Text',
		description: 'Switch with visible ON/OFF text',
		props: {
			design: 'inner',
			label: 'Power',
			colorScheme: 'green'
		}
	},
	{
		name: 'Modern',
		description: 'Modern design with track icons',
		props: {
			design: 'modern',
			label: 'Modern Switch',
			showIcons: true,
			colorScheme: 'purple'
		}
	},
	{
		name: 'Material Design',
		description: 'Google Material Design style',
		props: {
			design: 'material',
			label: 'Material',
			colorScheme: 'orange'
		}
	},
	{
		name: 'Multi-Option',
		description: 'Segmented control with multiple options',
		props: {
			design: 'multi',
			label: 'View Mode',
			options: ['List', 'Grid', 'Compact'],
			value: 'List'
		}
	}
];

export const colorExamples: Example[] = [
	{
		name: 'Blue',
		props: { colorScheme: 'blue', label: 'Blue theme' }
	},
	{
		name: 'Green',
		props: { colorScheme: 'green', label: 'Green theme' }
	},
	{
		name: 'Red',
		props: { colorScheme: 'red', label: 'Red theme' }
	},
	{
		name: 'Purple',
		props: { colorScheme: 'purple', label: 'Purple theme' }
	},
	{
		name: 'Orange',
		props: { colorScheme: 'orange', label: 'Orange theme' }
	},
	{
		name: 'Pink',
		props: { colorScheme: 'pink', label: 'Pink theme' }
	}
];

export const sizeExamples: Example[] = [
	{
		name: 'Extra Small',
		props: { size: 'xs', label: 'XS' }
	},
	{
		name: 'Small',
		props: { size: 'sm', label: 'Small' }
	},
	{
		name: 'Medium',
		props: { size: 'md', label: 'Medium' }
	},
	{
		name: 'Large',
		props: { size: 'lg', label: 'Large' }
	},
	{
		name: 'Extra Large',
		props: { size: 'xl', label: 'XL' }
	}
];

export const customizationExamples: Example[] = [
	{
		name: 'With Shadow',
		description: 'Switch with shadow effect',
		props: {
			shadow: true,
			colorScheme: 'blue',
			label: 'Shadow effect'
		}
	},
	{
		name: 'With Outline',
		description: 'Switch with border outline',
		props: {
			outline: true,
			colorScheme: 'purple',
			label: 'With outline'
		}
	},
	{
		name: 'Sharp Corners',
		description: 'Non-rounded switch',
		props: {
			rounded: false,
			colorScheme: 'red',
			label: 'Sharp corners'
		}
	},
	{
		name: 'Left Label',
		description: 'Label on the left side',
		props: {
			labelPosition: 'left',
			label: 'Left label',
			colorScheme: 'green'
		}
	},
	{
		name: 'Custom Icons',
		description: 'Custom on/off icons',
		props: {
			showIcons: true,
			onIcon: '🌙',
			offIcon: '☀️',
			label: 'Day/Night mode',
			colorScheme: 'purple'
		}
	},
	{
		name: 'Slow Animation',
		description: 'Extended animation duration',
		props: {
			animationDuration: 800,
			animationEasing: 'ease-in-out',
			label: 'Slow transition',
			colorScheme: 'orange'
		}
	}
];
