import { mount } from 'svelte';
import Switch from './lib/Switch.svelte';

const switchElement = document.getElementById('switch');
const svelteSwitch = switchElement ? mount(Switch, { target: switchElement }) : null;

export default svelteSwitch;
