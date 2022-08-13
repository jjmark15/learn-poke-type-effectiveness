<script lang="ts">
	import { elementString } from '../element';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>

<p class="text-7xl text-center text-secondary-color dark:text-dark-secondary-color">
	{elementString(scenario.damageElement())} attacks {elementString(scenario.defendingElement())}
</p>
