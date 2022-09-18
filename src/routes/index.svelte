<script lang="ts">
	import { Effectiveness, EFFECTIVENESSES } from '$lib/effectiveness';
	import { browser } from '$app/env';
	import type { Scenario } from '$lib/scenario';
	import EffectivenessButton from '$lib/components/EffectivenessButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import StreakCounterView from '$lib/components/StreakCounterView.svelte';
	import ScenarioView from '$lib/components/ScenarioView.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import FullScreenPage from '$lib/components/FullScreenPage.svelte';
	import { gameState } from '$lib/gameStateStore';

	function refreshLocalScenario() {
		scenario = $gameState.scenario();
	}

	async function refreshLocalHighScore() {
		streakHighScore = await $gameState.highScore();
	}

	function refreshLocalStreakCount(): void {
		streakCounterValue = $gameState.currentStreak();
	}

	function refreshLocalAnswerSelection() {
		effectivenessSelection = $gameState.selectedEffectiveness();
	}

	function refreshLocalCorrectAnswer() {
		correctEffectiveness = $gameState.correctEffectiveness();
	}

	function handleSelection(effectiveness: Effectiveness) {
		$gameState.selectEffectiveness(effectiveness);
		refreshLocalAnswerSelection();
		refreshLocalStreakCount();
	}

	function resetState() {
		$gameState.proceedToNextScenario();
		scenarioCount += 1;
		if ($gameState.startingANewStreak()) {
			refreshLocalHighScore();
		}
		refreshLocalStreakCount();
		refreshLocalAnswerSelection();
		refreshLocalScenario();
		refreshLocalCorrectAnswer();
	}

	function initialiseLocalVariables(): void {
		refreshLocalHighScore();
		refreshLocalStreakCount();
		refreshLocalScenario();
		refreshLocalCorrectAnswer();
	}

	let scenario: Scenario;
	let streakHighScore: number;
	let streakCounterValue: number = 0;
	let correctEffectiveness: Effectiveness;
	let effectivenessSelection: Effectiveness | undefined;
	$: answerSelected = effectivenessSelection !== undefined;

	if (browser) {
		initialiseLocalVariables();
	}

	let showLoading = true;
	let scenarioCount: number = 0;

	onMount(() => {
		showLoading = false;
	});
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<FullScreenPage>
	<div class="flex flex-grow flex-col">
		<StreakCounterView streak={streakCounterValue} bestStreak={streakHighScore} />
		<div class="flex flex-col flex-grow justify-center">
			<div class="flex flex-col flex-grow justify-center mb-2">
				{#if showLoading}
					<p class="text-7xl text-center text-gray-900 dark:text-pink-200">Loading</p>
				{:else}
					{#key scenarioCount}
						<div out:slide|local={{ duration: 200 }} in:slide={{ delay: 200, duration: 200 }}>
							<ScenarioView {scenario} />
						</div>
					{/key}
				{/if}
			</div>

			<div class="flex flex-col flex-grow-0 sm:flex-grow justify-center sm:max-h-80">
				<div class="flex flex-row flex-wrap mb-2 justify-center">
					{#each EFFECTIVENESSES as eff}
						<EffectivenessButton
							class="m-1 flex-grow-0"
							isCorrect={eff === correctEffectiveness}
							effectiveness={eff}
							disabled={answerSelected}
							on:click={() => handleSelection(eff)}
						/>
					{/each}
				</div>
				<div class="flex flex-col flex-grow-0 justify-center sm:flex-grow">
					<Button class="mx-auto flex-grow-0" disabled={!answerSelected} on:click={resetState}
						>{'Next'}</Button
					>
				</div>
			</div>
		</div>
	</div>
</FullScreenPage>
