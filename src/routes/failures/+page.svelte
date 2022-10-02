<script lang="ts">
	import { EffectivenessCalculator } from '$lib/effectivenessCalculator';
	import type { Scenario } from '$lib/scenario';
	import { onMount } from 'svelte';
	import { IndexedDbFailureHistoryRepository } from '$lib/failureHistoryRepository';
	import ScenarioWithAnswerView from '$lib/components/ScenarioWithAnswerView.svelte';
	import type { Effectiveness } from '$lib/effectiveness';
	import Page from '$lib/components/Page.svelte';

	async function refreshScenarioFailures() {
		scenarioFailures = await failureHistoryRepository.get();
	}

	function effectiveness(scenario: Scenario): Effectiveness {
		return effectivenessCalculcator.calculate(
			scenario.offensiveElement(),
			scenario.defensiveElement()
		);
	}

	let scenarioFailures: Scenario[] = [];

	let effectivenessCalculcator: EffectivenessCalculator = new EffectivenessCalculator();
	let failureHistoryRepository: IndexedDbFailureHistoryRepository =
		new IndexedDbFailureHistoryRepository();

	onMount(() => {
		refreshScenarioFailures();
	});
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<Page>
	<div class="flex flex-grow flex-col">
		{#each scenarioFailures as scenario}
			<ScenarioWithAnswerView class="mb-2" {scenario} effectiveness={effectiveness(scenario)} />
		{/each}
	</div>
</Page>
