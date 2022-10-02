<script lang="ts">
	import ElementIcon from './ElementIcon.svelte';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>
<div class="font-striking scenario-view-container">
	<div class="text-7xl w-fit">
		<ElementIcon class="poke-icon--large" element={scenario.offensiveElement()} />
	</div>
	<div class="text-6xl mx-4 self-center">attacks</div>
	<div class="text-7xl w-fit">
		<ElementIcon class="poke-icon--large" element={scenario.defensiveElement()} />
	</div>
</div>

<style>
	.scenario-view-container {
		@apply text-center flex flex-row flex-wrap justify-center;

		& > div {
			@apply mb-4;
		}
	}
</style>
