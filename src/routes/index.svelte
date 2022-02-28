<script lang="ts">
	import { Effectiveness, EFFECTIVENESSES, effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { IndexedDbHighScoreRepository } from '$lib/high-score-repository';
	import { StreakCounter } from '$lib/streak-counter';
	import { browser } from '$app/env';
	import { GameState } from '$lib/game-state';
	import { ExhaustiveScenarioGenerator } from '$lib/scenario-generator';
	import type { Scenario } from '$lib/scenario';
	import DarkToggle from '$lib/DarkToggle.svelte';

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

	function refreshLocalSelectedIsCorrect() {
		selectedIsCorrect = gameState.selectedEffectivenessIsCorrect();
	}

	function refreshLocalCorrectAnswer() {
		correctEffectiveness = gameState.correctEffectiveness();
	}

	function handleSelection(effectiveness: Effectiveness) {
		gameState.selectEffectiveness(effectiveness);
		refreshLocalAnswerSelection();
		refreshLocalSelectedIsCorrect();
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
		refreshLocalSelectedIsCorrect();
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
	let selectedIsCorrect: boolean;

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
		<p class="flex-grow">
			Current streak: {streakCounterValue} <span class="text-gray-500">({streakHighScore})</span>
		</p>
		<DarkToggle />
	</div>
	<div class="flex flex-col flex-grow justify-center">
		<div class="flex flex-col flex-grow justify-center mb-2">
			<p class="text-7xl text-center text-pink-200">
				{#if browser}
					{elementString(scenario.damageElement())} attacks {elementString(
						scenario.defendingElement()
					)}
				{:else}
					Loading
				{/if}
			</p>
		</div>
		<div class="flex flex-row flex-wrap mb-2 justify-center">
			{#each EFFECTIVENESSES as eff}
				<button
					class="app-btn m-1 flex-grow-0"
					class:answer-btn--correct={correctEffectiveness === eff && answerSelected}
					class:answer-btn--wrong={effectivenessSelection === eff && !selectedIsCorrect}
					class:app-btn--disabled={answerSelected}
					disabled={answerSelected}
					on:click={() => handleSelection(eff)}>{effectivenessString(eff)}</button
				>
			{/each}
		</div>
		<div class="flex flex-col flex-grow-0 justify-center sm:flex-grow">
			<button
				disabled={!answerSelected}
				class="flex-grow-0 mx-auto app-btn"
				class:app-btn--disabled={!answerSelected}
				on:click={resetState}>Next</button
			>
		</div>
	</div>
</div>

<style>
	.app-btn {
		@apply py-1 px-2 border-solid border-2 border-pink-200 rounded-lg text-white;
	}

	.app-btn--disabled {
		@apply text-gray-500 border-gray-500 border-dashed;
	}

	.answer-btn--correct {
		@apply border-green-300 text-green-300;
	}

	.answer-btn--wrong {
		@apply border-red-500 text-red-500;
	}
</style>
