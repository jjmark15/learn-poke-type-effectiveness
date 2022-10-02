<script lang="ts">
	import { effectivenessString, type Effectiveness } from '$lib/effectiveness';
	import { elementString } from '$lib/element';

	import type { Scenario } from '$lib/scenario';

	export let scenario: Scenario;
	export let effectiveness: Effectiveness;

	function effectivenessClass(effectiveness: Effectiveness): string {
		return (
			'effectiveness--' + effectivenessString(effectiveness).toLowerCase().replaceAll(' ', '-')
		);
	}
</script>

<p class="text-2xl">
	<span class="element font-striking">{elementString(scenario.offensiveElement())}</span>
	->
	<span class="element font-striking">{elementString(scenario.defensiveElement())}</span>
	>
	<span class="effectiveness font-striking {effectivenessClass(effectiveness)}"
		>{effectivenessString(effectiveness)}</span
	>
</p>
