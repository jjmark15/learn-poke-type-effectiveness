<script lang="ts">
	import { Effectiveness, EFFECTIVENESSES } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { IndexedDbHighScoreRepository } from '$lib/high-score-repository';
	import { StreakCounter } from '$lib/streak-counter';
	import { browser } from '$app/env';
	import { GameState } from '$lib/game-state';
	import { ExhaustiveScenarioGenerator } from '$lib/scenario-generator';
	import type { Scenario } from '$lib/scenario';
	import DarkToggle from '$lib/DarkToggle.svelte';
	import EffectivenessButton from '$lib/EffectivenessButton.svelte';
	import Button from '$lib/Button.svelte';
	import StreakCounterView from '$lib/StreakCounterView.svelte';
	import ScenarioView from '$lib/ScenarioView.svelte';

	function refreshLocalScenario() {
		scenario = gameState.scenario();
	}

	async function refreshLocalHighScore() {
		streakHighScore = await gameState.highScore();
	}

	function refreshLocalStreakCount(): void {
		streakCounterValue = gameState.currentStreak();
	}

	function refreshLocalAnswerSelection() {
		effectivenessSelection = gameState.selectedEffectiveness();
	}

	function refreshLocalCorrectAnswer() {
		correctEffectiveness = gameState.correctEffectiveness();
	}

	function handleSelection(effectiveness: Effectiveness) {
		gameState.selectEffectiveness(effectiveness);
		refreshLocalAnswerSelection();
		refreshLocalStreakCount();
	}

	function resetState() {
		gameState.proceedToNextScenario();
		if (gameState.startingANewStreak()) {
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

	function initialiseGameState(): void {
		gameState = new GameState(
			new IndexedDbHighScoreRepository(),
			new EffectivenessCalculator(),
			ExhaustiveScenarioGenerator.default(),
			StreakCounter.default()
		);
	}

	let scenario: Scenario;
	let streakHighScore: number = 0;
	let streakCounterValue: number = 0;
	let correctEffectiveness: Effectiveness;
	let effectivenessSelection: Effectiveness;
	$: answerSelected = effectivenessSelection !== undefined;

	let gameState: GameState<IndexedDbHighScoreRepository, ExhaustiveScenarioGenerator>;
	if (browser) {
		initialiseGameState();
		initialiseLocalVariables();
	}
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<div class="h-full text-3xl flex flex-grow flex-col">
	<div class="flex flex-row justify-start">
		<StreakCounterView class="flex-grow" streak={streakCounterValue} bestStreak={streakHighScore} />
		<DarkToggle />
	</div>
	<div class="flex flex-col flex-grow justify-center">
		<div class="flex flex-col flex-grow justify-center mb-2">
			{#if browser}
				<ScenarioView {scenario} />
			{:else}
				<p class="text-7xl text-center text-gray-900 dark:text-pink-200">Loading</p>
			{/if}
		</div>
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
			<Button
				class="mx-auto flex-grow-0"
				text="Next"
				disabled={!answerSelected}
				on:click={resetState}
			/>
		</div>
	</div>
</div>
