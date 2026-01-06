import Switch from './lib/Switch.svelte'

const switchElement = document.getElementById('switch');
const svelteSwitch = switchElement ? new Switch({
  target: switchElement
}) : null;

export default svelteSwitch;
