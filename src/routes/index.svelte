<script lang="ts">
	import { Effectiveness } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { RandomElementSelector } from '$lib/random-element-selector';

	function effectivenessDescription(effectiveness: Effectiveness): String {
		switch (effectiveness) {
			case Effectiveness.Zero:
				return 'No effect';
			case Effectiveness.Half:
				return 'Not very effective';
			case Effectiveness.Single:
				return 'Normal';
			case Effectiveness.Double:
				return 'Super effective';
		}
	}

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
<p>{effectivenessDescription(effectivess)}</p>
<button on:click={generateNewElements}>Refresh</button>
