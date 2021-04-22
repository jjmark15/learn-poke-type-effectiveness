<script lang="ts">
	import { Effectiveness } from '$lib/effectiveness';

	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { PokemonElement } from '$lib/element';

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

	const effectivenessCalculator = new EffectivenessCalculator();

	let effectivess = effectivenessCalculator.calculate(PokemonElement.Fire, PokemonElement.Dragon);
</script>

<p>{effectivenessDescription(effectivess)}</p>
