<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { dark } from '../lib/stores';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
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

<div class:dark={$dark === true} class="flex flex-grow">
	<div
		class="bg-pink-200 dark:bg-gray-900 text-gray-700 dark:text-white p-4 flex-grow flex flex-col"
	>
		<div class="flex flex-row justify-start mb-2">
			<nav class="flex-grow">
				<a href="/">home</a>
				<a href="/failures">failures</a>
			</nav>
			<DarkModeToggle class="ml-2" />
		</div>
		<slot />
	</div>
</div>
