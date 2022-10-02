<script lang="ts">
	import { elementString } from '../element';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>

<div class="text-center text-secondary-color dark:text-dark-secondary-color font-striking">
	<span class="text-7xl">{elementString(scenario.offensiveElement())}</span>
	<span class="text-6xl mx-2">attacks</span>
	<span class="text-7xl">{elementString(scenario.defensiveElement())}</span>
</div>
