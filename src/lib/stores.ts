import { writable } from 'svelte/store';
import { browser } from '$app/env';

const theme_store_name = 'use_dark_theme';

function getStored(): boolean {
	if (!browser) {
		return true;
	}
	const result = localStorage.getItem(theme_store_name);

	if (result === null) {
		return true;
	}

	return result === 'true';
}

export const dark = writable(getStored());

if (browser) {
	const update = (value: boolean) => {
		localStorage.setItem(theme_store_name, value.toString());
	};

	dark.subscribe((value) => {
		update(value);
	});
}
