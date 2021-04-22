<script lang="ts">
	import { Effectiveness, effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { RandomElementSelector } from '$lib/random-element-selector';
	import EffectivenessAnswerButton from '$lib/components/EffectivenessAnswerButton.svelte';

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

	const effectivenessCalculator = new EffectivenessCalculator();
	const elementSelector = RandomElementSelector.default();

	let damageElement = elementSelector.generate();
	let defendingElement = elementSelector.generate();

	$: effectivess = effectivenessCalculator.calculate(damageElement, defendingElement);
	let effectivenessSelection: Effectiveness;
</script>

<p>Damage type is {elementString(damageElement)}</p>
<p>Defending type is {elementString(defendingElement)}</p>
{#if effectivenessSelection !== undefined}
	<p>Correct answer is {effectivenessString(effectivess)}</p>
{/if}
<div>
	<EffectivenessAnswerButton effectiveness={Effectiveness.Zero} callback={handleSelection} />
	<EffectivenessAnswerButton effectiveness={Effectiveness.Half} callback={handleSelection} />
	<EffectivenessAnswerButton effectiveness={Effectiveness.Single} callback={handleSelection} />
	<EffectivenessAnswerButton effectiveness={Effectiveness.Double} callback={handleSelection} />
</div>
<button on:click={resetState}>Next</button>
