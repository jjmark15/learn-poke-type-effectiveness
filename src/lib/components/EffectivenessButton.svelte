<script lang="ts">
	import { effectivenessString, type Effectiveness } from '../effectiveness';
	import { createEventDispatcher } from 'svelte';

	export let isSelected: boolean;
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
	class="btn font-striking large-text {classNames}"
	class:correct={isCorrect && disabled}
	class:incorrect={!isCorrect && isSelected}
	{disabled}
	on:click={() => handleSelection()}>{effectivenessString(effectiveness)}</button
>
