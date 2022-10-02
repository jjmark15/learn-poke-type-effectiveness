<script lang="ts">
	import { effectivenessString, type Effectiveness } from '$lib/effectiveness';
	import ElementLabel from '$lib/components/ElementLabel.svelte';
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

<div class="{classNames} text-xl mb-1 flex flex-row flex-wrap">
	<ElementLabel element={scenario.offensiveElement()} />
	<span class="mx-1">-></span>
	<ElementLabel element={scenario.defensiveElement()} />
	<span class="mx-1">></span>
	<span class="effectiveness {effectivenessClass(effectiveness)}"
		>{effectivenessString(effectiveness)}</span
	>
</div>

<style>
	.effectiveness {
		@apply px-1 rounded-lg;

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
