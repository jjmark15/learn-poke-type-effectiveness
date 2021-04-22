<script lang="ts">
	import { effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { RandomElementSelector } from '$lib/random-element-selector';

	function generateNewElements() {
		damageElement = elementSelector.generate();
		defendingElement = elementSelector.generate();
	}

	const effectivenessCalculator = new EffectivenessCalculator();
	const elementSelector = RandomElementSelector.default();

	let damageElement = elementSelector.generate();
	let defendingElement = elementSelector.generate();

	$: effectivess = effectivenessCalculator.calculate(damageElement, defendingElement);
</script>

<p>Damage type is {elementString(damageElement)}</p>
<p>Defending type is {elementString(defendingElement)}</p>
<p>{effectivenessString(effectivess)}</p>
<button on:click={generateNewElements}>Refresh</button>
