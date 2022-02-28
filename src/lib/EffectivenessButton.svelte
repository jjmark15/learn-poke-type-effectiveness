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
		@apply py-1 px-2 border-solid border-2 rounded-lg border-white;
	}

	.btn--dark {
		@apply border-pink-200 text-white;
	}

	.btn--disabled {
		@apply text-pink-50 border-pink-50 border-dashed;
	}

	.btn--disabled-dark {
		@apply text-gray-500 border-gray-500 border-dashed;
	}

	.btn--correct {
		@apply border-green-300 text-green-300;
	}

	.btn--wrong {
		@apply border-red-500 text-red-500;
	}
</style>
