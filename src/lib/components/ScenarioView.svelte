<script lang="ts">
	import { elementString } from '../element';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>

<p class="text-7xl text-center text-gray-900 dark:text-pink-200">
	{elementString(scenario.damageElement())} attacks {elementString(scenario.defendingElement())}
</p>
