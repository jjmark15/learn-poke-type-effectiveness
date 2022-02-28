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
</style>
