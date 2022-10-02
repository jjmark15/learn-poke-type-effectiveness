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

<p class="text-2xl mb-1">
	<span class="element font-striking">{elementString(scenario.offensiveElement())}</span>
	->
	<span class="element font-striking">{elementString(scenario.defensiveElement())}</span>
	>
	<span class="effectiveness font-striking {effectivenessClass(effectiveness)}"
		>{effectivenessString(effectiveness)}</span
	>
</p>

<style>
	.effectiveness {
		@apply px-2 py-1 rounded-lg;

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
</style>
