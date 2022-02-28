<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	export let text: string;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');

	function handleSelection() {
		click();
	}
</script>

<button
	class="app-btn mx-auto flex-grow-0"
	class:app-btn--disabled={disabled}
	{disabled}
	on:click={() => handleSelection()}>{text}</button
>

<style>
	.app-btn {
		@apply py-1 px-2 border-solid border-2 border-pink-200 rounded-lg text-white;
	}

	.app-btn--disabled {
		@apply text-gray-500 border-gray-500 border-dashed;
	}
</style>
