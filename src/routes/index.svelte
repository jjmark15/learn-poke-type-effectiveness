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
</script>

<div class="h-full text-3xl flex flex-col justify-end p-4">
	{#if answerSelected}
		<div class="text-center">Correct answer is {effectivenessString(effectivess)}</div>
		<div class="text-center">
			Your answer was {effectivenessString(effectivenessSelection)}
		</div>
	{/if}
	<div class="text-center">
		{elementString(damageElement)} attacks {elementString(defendingElement)}
	</div>
	<div class="flex flex-row flex-wrap justify-evenly">
		{#each effectivenesses as eff}
			<button
				class="border-solid border-2 border-pink-200 rounded-lg py-1 px-2 my-1"
				disabled={answerSelected}
				on:click={() => handleSelection(eff)}>{effectivenessString(eff)}</button
			>
		{/each}
	</div>
	<button class="inline-flex mx-auto text-center" on:click={resetState}>Next</button>
</div>
