<script lang="ts">
	import ElementIcon from '$lib/components/ElementIcon.svelte';
	import EffectivenessIcon from './EffectivenessIcon.svelte';
	import type { Scenario } from '$lib/scenario';
	import type { Effectiveness } from '$lib/effectiveness';

	let classNames: string = '';
	export { classNames as class };

	export let scenario: Scenario;
	export let effectiveness: Effectiveness;
</script>

<div class="{classNames} text-base flex flex-row flex-wrap">
	<ElementIcon element={scenario.offensiveElement()} />
	<div class="scenario-symbol">-></div>
	<ElementIcon element={scenario.defensiveElement()} />
	<span class="scenario-symbol">=></span>
	<EffectivenessIcon {effectiveness} />
</div>

<style>
	.scenario-symbol {
		@apply mx-1 self-center;
	}
</style>
