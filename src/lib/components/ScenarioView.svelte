<script lang="ts">
	import ElementIcon from './ElementIcon.svelte';
	import { scale } from 'svelte/transition';

	import type { Scenario } from '../scenario';

	export let scenario: Scenario;
</script>

<div class="font-striking scenario-view-container">
	{#key scenario}
		<div in:scale|local={{ duration: 300 }} class="text-7xl w-fit">
			<ElementIcon class="poke-icon--large" element={scenario.offensiveElement()} />
		</div>
	{/key}
	<div class="text-6xl mx-4 self-center">attacks</div>
	{#key scenario}
		<div in:scale|local={{ duration: 300, delay: 50 }} class="text-7xl w-fit">
			<ElementIcon class="poke-icon--large" element={scenario.defensiveElement()} />
		</div>
	{/key}
</div>

<style>
	.scenario-view-container {
		@apply flex flex-col md:flex-row md:flex-wrap md:justify-center;

		div {
			@apply mb-4 self-center;
		}
	}
</style>
