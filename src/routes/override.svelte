<script lang="ts">
	import { IndexedDbHighScoreRepository } from '$lib/high-score-repository';
	import { browser } from '$app/env';
	import Page from '$lib/components/Page.svelte';
	import Button from '$lib/components/Button.svelte';

	async function refreshLocalHighScore() {
		streakHighScore = await highScoreRepository.get();
	}

	async function submitNewHighScore() {
		if (streakHighScore !== null) {
			await highScoreRepository.update(streakHighScore);
		} else {
			refreshLocalHighScore();
		}
	}

	let streakHighScore: number = 0;
	let highScoreRepository: IndexedDbHighScoreRepository;

	if (browser) {
		highScoreRepository = new IndexedDbHighScoreRepository();
		refreshLocalHighScore();
	}
</script>

<svelte:head>
	<title>Override PokeLearn Highscore</title>
</svelte:head>

<Page>
	<div class="flex flex-wrap">
		<label label="number input">
			<input type="number" bind:value={streakHighScore} min="0" class="text-black" />
		</label>
		<Button on:click={submitNewHighScore}>Submit</Button>
	</div>
</Page>
