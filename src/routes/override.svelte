<script lang="ts">
	import { browser } from '$app/env';
	import Page from '$lib/components/Page.svelte';
	import Button from '$lib/components/Button.svelte';
	import { SupabaseHighScoreRepository } from '$lib/supabaseHighScoreRepository';
	import { LocalAndRemoteHighScoreRepository } from '$lib/localAndRemoteHighScoreRepository';
	import { IndexedDbHighScoreRepository } from '$lib/indexedDbHighScoreRepository';

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
	let highScoreRepository: LocalAndRemoteHighScoreRepository;

	if (browser) {
		highScoreRepository = new LocalAndRemoteHighScoreRepository(
			new IndexedDbHighScoreRepository(),
			new SupabaseHighScoreRepository()
		);
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
