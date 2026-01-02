import { writable } from 'svelte/store';

export interface PlaygroundState {
	activeTab: 'preview' | 'code';
	codeLanguage: 'svelte' | 'typescript';
}

const defaultState: PlaygroundState = {
	activeTab: 'preview',
	codeLanguage: 'svelte'
};

export const playgroundState = writable<PlaygroundState>(defaultState);

export function setActiveTab(tab: 'preview' | 'code') {
	playgroundState.update((state) => ({ ...state, activeTab: tab }));
}

export function setCodeLanguage(lang: 'svelte' | 'typescript') {
	playgroundState.update((state) => ({ ...state, codeLanguage: lang }));
}
