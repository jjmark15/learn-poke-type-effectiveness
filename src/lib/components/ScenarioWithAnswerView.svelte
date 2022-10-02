<script lang="ts">
	import { effectivenessString, type Effectiveness } from '$lib/effectiveness';
	import ElementLabel from '$lib/components/ElementIcon.svelte';
	import type { Scenario } from '$lib/scenario';

	let classNames: string = '';
	export { classNames as class };

	export let scenario: Scenario;
	export let effectiveness: Effectiveness;

	function effectivenessClass(effectiveness: Effectiveness): string {
		return (
			'effectiveness--' + effectivenessString(effectiveness).toLowerCase().replaceAll(' ', '-')
		);
	}
</script>

<div class="{classNames} text-base flex flex-row flex-wrap">
	<ElementLabel element={scenario.offensiveElement()} />
	<div class="scenario-symbol">-></div>
	<ElementLabel element={scenario.defensiveElement()} />
	<span class="scenario-symbol">=></span>
	<span class="poke-icon {effectivenessClass(effectiveness)}"
		>{effectivenessString(effectiveness)}</span
	>
</div>

<style>
	.effectiveness {
		&--no-effect {
			@apply bg-black text-yellow-200;
		}

		&--not-very-effective {
			@apply bg-red-400 text-yellow-200;
		}

		&--normal {
			@apply bg-white text-black;
		}

		&--super-effective {
			@apply bg-green-400 text-yellow-200;
		}
	}

	.scenario-symbol {
		@apply mx-1 self-center;
	}
</style>
