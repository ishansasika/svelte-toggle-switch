# Svelte Toggle Switch

## Install

Install using NPM

```js
npm i svelte-toggle-switch
```

Install using YARN

```js
yarn add svelte-toggle-switch
```

## How to use

```js
<script>
import Select from 'svelte-toggle-switch';

let switchValue;
let sliderValue;
let multiValue;

</script>

<Switch bind:value={switchValue} label="Enable Toggle" design="inner" />
<p>
	Switch is {switchValue}
</p>

<Switch bind:value={sliderValue} label="Enable Toggle" fontSize={24} design="slider" />
<p>
	Switch is {sliderValue}
</p>

<Switch bind:value={multiValue} label="Choose an Option" design="multi" options={['true', 'false']} fontSize={12}/>
<p>
	Switch is {multiValue}
</p>

```

### Options

| API | Value | 
| --- | --- |
| `label` | `Your Text` | 
| `design` | `inner`, `slider`, `multi` | 
| `fontSize` | `16px` | 
| `options` | `['true', 'false']` | 

