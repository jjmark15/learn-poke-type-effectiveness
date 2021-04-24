<script lang="ts">
	import { Effectiveness, effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { RandomElementSelector } from '$lib/random-element-selector';

	function generateNewElements() {
		damageElement = elementSelector.generate();
		defendingElement = elementSelector.generate();
	}

	function handleSelection(effectiveness: Effectiveness) {
		effectivenessSelection = effectiveness;
	}

	function resetState() {
		effectivenessSelection = undefined;
		generateNewElements();
	}

	const effectivenesses: Array<Effectiveness> = [
		Effectiveness.Zero,
		Effectiveness.Half,
		Effectiveness.Single,
		Effectiveness.Double
	];
	const effectivenessCalculator = new EffectivenessCalculator();
	const elementSelector = RandomElementSelector.default();

	let damageElement = elementSelector.generate();
	let defendingElement = elementSelector.generate();

	$: effectivess = effectivenessCalculator.calculate(damageElement, defendingElement);
	let effectivenessSelection: Effectiveness;
	$: answerSelected = effectivenessSelection !== undefined;
	$: selectedIsCorrect = effectivenessSelection === effectivess;
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<div class="h-full text-3xl flex flex-col justify-end sm:justify-center p-4">
	<div class="text-center">
		{elementString(damageElement)} attacks {elementString(defendingElement)}
	</div>
	<div class="flex flex-row flex-wrap justify-evenly">
		{#each effectivenesses as eff}
			<button
				class="app-btn my-1"
				class:answer-btn--correct={effectivess === eff && answerSelected}
				class:answer-btn--wrong={effectivenessSelection === eff && !selectedIsCorrect}
				class:app-btn--disabled={answerSelected}
				disabled={answerSelected}
				on:click={() => handleSelection(eff)}>{effectivenessString(eff)}</button
			>
		{/each}
	</div>
	<button
		disabled={!answerSelected}
		class="inline-flex mx-auto text-center app-btn mt-1"
		class:app-btn--disabled={!answerSelected}
		on:click={resetState}>Next</button
	>
</div>

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
