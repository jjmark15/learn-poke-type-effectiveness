<script lang="ts">
	import { Effectiveness, effectivenessString } from '$lib/effectiveness';
	import { EffectivenessCalculator } from '$lib/effectiveness-calculator';
	import { elementString } from '$lib/element';
	import { HighScoreRepository } from '$lib/high-score-repository';
	import { RandomElementSelector } from '$lib/random-element-selector';
	import { StreakCounter } from '$lib/streak-counter';
	import { browser } from '$app/env';

	function generateNewElements() {
		damageElement = elementSelector.generate();
		defendingElement = elementSelector.generate();
	}

	function advanceStreak() {
		if (effectivenessSelection === correctEffectivess) {
			streakCounter.increment();
		} else {
			updateStreakHighScoreIfBetter(streakCounter.value());
			streakCounter.reset();
		}
	}

	function refreshLocalHighScore() {
		highScoreRepository.get().then((score) => {
			streakHighScore = score;
		});
	}

	async function updateStreakHighScoreIfBetter(newStreakValue: number) {
		if (newStreakValue > streakHighScore) {
			highScoreRepository.update(newStreakValue).then(() => {
				refreshLocalHighScore();
			});
		}
	}

	function handleSelection(effectiveness: Effectiveness) {
		effectivenessSelection = effectiveness;
		advanceStreak();
		streakCounterValue = streakCounter.value();
	}

	function resetState() {
		effectivenessSelection = undefined;
		generateNewElements();
	}

	const effectivenesses: Array<Effectiveness> = [
		Effectiveness.Zero,
		Effectiveness.Half,
		Effectiveness.Single,
		Effectiveness.Double
	];
	const effectivenessCalculator = new EffectivenessCalculator();
	const elementSelector = RandomElementSelector.default();
	const streakCounter = StreakCounter.default();
	let highScoreRepository: HighScoreRepository;
	if (browser) {
		highScoreRepository = new HighScoreRepository();
		refreshLocalHighScore();
	}

	let damageElement = elementSelector.generate();
	let defendingElement = elementSelector.generate();

	let streakHighScore = 0;
	$: streakCounterValue = streakCounter.value();
	$: correctEffectivess = effectivenessCalculator.calculate(damageElement, defendingElement);
	let effectivenessSelection: Effectiveness;
	$: answerSelected = effectivenessSelection !== undefined;
	$: selectedIsCorrect = effectivenessSelection === correctEffectivess;
</script>

<svelte:head>
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<div class="h-full text-3xl flex flex-col justify-end sm:justify-center p-4">
	<div class="flex flex-row justify-start">
		<p>
			Current streak: {streakCounterValue} <span class="text-gray-500">({streakHighScore})</span>
		</p>
	</div>
	<div class="flex flex-col flex-grow justify-center mb-2">
		<p class="text-7xl text-center text-pink-200">
			{elementString(damageElement)} attacks {elementString(defendingElement)}
		</p>
	</div>
	<div class="flex flex-row flex-wrap mb-2 justify-center">
		{#each effectivenesses as eff}
			<button
				class="app-btn m-1 flex-grow-0 flex-shrink"
				class:answer-btn--correct={correctEffectivess === eff && answerSelected}
				class:answer-btn--wrong={effectivenessSelection === eff && !selectedIsCorrect}
				class:app-btn--disabled={answerSelected}
				disabled={answerSelected}
				on:click={() => handleSelection(eff)}>{effectivenessString(eff)}</button
			>
		{/each}
	</div>
	<div class="flex flex-col flex-grow-0 sm:flex-grow">
		<button
			disabled={!answerSelected}
			class="mx-auto my-auto app-btn"
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
