<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;
	let classNames: string = '';
	export { classNames as class };

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');

	function handleSelection() {
		click();
	}
</script>

<button class="btn {classNames}" {disabled} on:click={() => handleSelection()}
	><slot />
</button>
