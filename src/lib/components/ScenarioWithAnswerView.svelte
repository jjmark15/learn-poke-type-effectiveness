<script lang="ts">
	import { effectivenessString, type Effectiveness } from '$lib/effectiveness';
	import { elementString } from '$lib/element';

	import type { Scenario } from '$lib/scenario';

	export let scenario: Scenario;
	export let effectiveness: Effectiveness;

	function failureString(): string {
		return (
			elementString(scenario.offensiveElement()) +
			' -> ' +
			elementString(scenario.defensiveElement()) +
			' = ' +
			effectivenessString(effectiveness)
		);
	}
</script>

<p>{failureString()}</p>
