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

	function answerSelected(): boolean {
		return effectivenessSelection !== undefined;
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
</script>

<p>Damage type is {elementString(damageElement)}</p>
<p>Defending type is {elementString(defendingElement)}</p>
{#if answerSelected()}
	<p>Correct answer is {effectivenessString(effectivess)}</p>
	<p>Your answer was {effectivenessString(effectivenessSelection)}</p>
{/if}
<div>
	{#each effectivenesses as eff}
		<button on:click={() => handleSelection(eff)}>{effectivenessString(eff)}</button>
	{/each}
</div>
<button on:click={resetState}>Next</button>
