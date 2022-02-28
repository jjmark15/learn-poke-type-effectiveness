<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { dark } from '$lib/stores';

	export let disabled: boolean = false;
	export let text: string;
	let classNames: string = '';
	export { classNames as class };

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');

	function handleSelection() {
		click();
	}
</script>

<button
	class="btn {classNames}"
	class:btn--dark={$dark}
	class:btn--disabled-dark={$dark && disabled}
	class:btn--disabled={disabled}
	{disabled}
	on:click={() => handleSelection()}>{text}</button
>

<style>
	.btn {
		@apply py-1 px-2 rounded-lg bg-pink-100 shadow-md border-2 border-transparent;
	}

	.btn--dark {
		@apply text-gray-50 bg-gray-700;
	}

	.btn--disabled {
		@apply text-pink-200;
	}

	.btn--disabled-dark {
		@apply text-gray-500 bg-gray-800;
	}
</style>
