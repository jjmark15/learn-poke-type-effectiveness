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
	<title>Learn Pokemon Type Effectiveness</title>
</svelte:head>

<Page>
	<div>
		<label label="number input">
			<input type="number" bind:value={streakHighScore} min="0" />
		</label>
		<Button on:click={submitNewHighScore}>Submit</Button>
	</div>
	<pre>{streakHighScore}</pre>
</Page>
