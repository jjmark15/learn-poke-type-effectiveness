<script lang="ts">
	import { effectivenessString, type Effectiveness } from './effectiveness';
	import { createEventDispatcher } from 'svelte';
	import { dark } from '$lib/stores';

	let isSelected: boolean;
	export let isCorrect: boolean;
	export let disabled: boolean = false;
	export let effectiveness: Effectiveness;
	let classNames: string = '';
	export { classNames as class };

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');

	$: {
		if (disabled === false) {
			isSelected = false;
		}
	}

	function handleSelection() {
		isSelected = true;
		click();
	}
</script>

<button
	class="btn {classNames}"
	class:btn--dark={$dark}
	class:btn--correct={isCorrect && disabled}
	class:btn--wrong={!isCorrect && isSelected}
	class:btn--disabled={disabled}
	class:btn--disabled-dark={disabled && $dark}
	{disabled}
	on:click={() => handleSelection()}>{effectivenessString(effectiveness)}</button
>

<style>
	.btn {
		@apply py-1 px-2 rounded-lg bg-pink-100 shadow-sm border-2 border-transparent;
	}

	.btn--dark {
		@apply text-white bg-transparent border-pink-200;
	}

	.btn--disabled {
		@apply text-pink-200 bg-pink-100 border-dashed;
	}

	.btn--disabled-dark {
		@apply text-gray-500 bg-transparent border-gray-500;
	}

	.btn--correct {
		@apply border-green-300 text-green-300;
	}

	.btn--wrong {
		@apply border-red-500 text-red-500;
	}
</style>
