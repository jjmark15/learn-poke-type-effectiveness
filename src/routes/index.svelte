<script lang="ts">
	import { Effectiveness, EFFECTIVENESSES, effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString, PokemonElement } from '$lib/element';
	import { HighScoreRepository } from '$lib/high-score-repository';
	import { RandomElementSelector } from '$lib/random-element-selector';
	import { StreakCounter } from '$lib/streak-counter';
	import { browser } from '$app/env';
	import { GameState } from '$lib/game-state';

	function refreshLocalScenarioElements() {
		damageElement = gameState.damageElement();
		defendingElement = gameState.defendingElement();
	}

	function refreshLocalHighScore() {
		gameState.highScore().then((score) => {
			streakHighScore = score;
		});
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
		refreshLocalScenarioElements();
		refreshLocalCorrectAnswer();
	}

	function initialisePageVariables(): void {
		refreshLocalHighScore();
		refreshLocalStreakCount();
		refreshLocalScenarioElements();
		refreshLocalCorrectAnswer();
		refreshLocalSelectedIsCorrect();
	}

	let damageElement: PokemonElement;
	let defendingElement: PokemonElement;
	let streakHighScore: number = 0;
	let streakCounterValue: number = 0;
	let correctEffectiveness: Effectiveness;
	let effectivenessSelection: Effectiveness;
	$: answerSelected = effectivenessSelection !== undefined;
	let selectedIsCorrect: boolean;

	const effectivenessCalculator = new EffectivenessCalculator();
	const elementSelector = RandomElementSelector.default();
	const streakCounter = StreakCounter.default();
	let highScoreRepository: HighScoreRepository;
	let gameState: GameState;
	if (browser) {
		highScoreRepository = new HighScoreRepository();
		gameState = new GameState(
			highScoreRepository,
			effectivenessCalculator,
			elementSelector,
			streakCounter
		);
		initialisePageVariables();
	}
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<div class="h-full text-3xl flex flex-col justify-end sm:justify-center">
	<div class="flex flex-row justify-start">
		<p>
			Current streak: {streakCounterValue} <span class="text-gray-500">({streakHighScore})</span>
		</p>
	</div>
	<div class="flex flex-col flex-grow justify-center mb-2">
		<p class="text-7xl text-center text-pink-200">
			{#if browser}
				{elementString(damageElement)} attacks {elementString(defendingElement)}
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
