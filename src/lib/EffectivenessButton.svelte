<script lang="ts">
	import { effectivenessString, type Effectiveness } from './effectiveness';
	import { createEventDispatcher } from 'svelte';

	let isSelected: boolean;
	export let isCorrect: boolean;
	export let disabled: boolean = false;
	export let effectiveness: Effectiveness;

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
	class="app-btn m-1 flex-grow-0"
	class:answer-btn--correct={isCorrect && (isSelected || disabled)}
	class:answer-btn--wrong={!isCorrect && isSelected}
	class:app-btn--disabled={disabled}
	{disabled}
	on:click={() => handleSelection()}>{effectivenessString(effectiveness)}</button
>

<style>
	.app-btn {
		@apply py-1 px-2 border-solid border-2 border-pink-200 rounded-lg text-white;
	}

	.app-btn--disabled {
		@apply text-gray-500 border-gray-500 border-dashed;
	}

	.answer-btn--correct {
		@apply border-green-300 text-green-300;
	}

	.answer-btn--wrong {
		@apply border-red-500 text-red-500;
	}
</style>
