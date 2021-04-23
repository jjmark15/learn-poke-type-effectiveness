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

<div class="text-2xl">
	<div>Damage type is {elementString(damageElement)}</div>
	<div>Defending type is {elementString(defendingElement)}</div>
	{#if answerSelected}
		<div>Correct answer is {effectivenessString(effectivess)}</div>
		<div>Your answer was {effectivenessString(effectivenessSelection)}</div>
	{/if}
	<div>
		{#each effectivenesses as eff}
			<button disabled={answerSelected} on:click={() => handleSelection(eff)}
				>{effectivenessString(eff)}</button
			>
		{/each}
	</div>
	<button on:click={resetState}>Next</button>
</div>
