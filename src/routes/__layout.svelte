<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { dark } from '../lib/stores';

	$: if (browser) {
		document.getElementsByTagName('html')[0].classList.toggle('dark', $dark);
	}
</script>

<svelte:head>
	<meta property="og:title" content="PokeLearn" />
	<meta property="og:description" content="Learn Pokemon Type Effectiveness" />
	<meta property="og:type" content="website" />
	{#if browser}
		<meta property="og:url" content={window.location.href} />;
	{/if}
	<meta name="theme-color" content={$dark ? '#111827' : '#fbcfe8'} />
</svelte:head>

<div class="flex flex-grow flex-col text-gray-700 dark:text-white text-3xl">
	<slot />
</div>
