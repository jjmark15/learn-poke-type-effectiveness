<script lang="ts">
	import { elementString } from '../element';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>

<p class="text-7xl text-center text-secondary-color dark:text-dark-secondary-color">
	{elementString(scenario.offensiveElement())} attacks {elementString(scenario.defensiveElement())}
</p>
