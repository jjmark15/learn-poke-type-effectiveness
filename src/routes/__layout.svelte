<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { dark } from '../lib/stores';
</script>

<svelte:head>
	<meta property="og:title" content="PokeLearn" />
	<meta property="og:description" content="Learn Pokemon Type Effectiveness" />
	<meta property="og:type" content="website" />
	{#if browser}
		<meta property="og:url" content={window.location.href} />;
	{/if}
</svelte:head>

<div class:dark={$dark === true} class="flex flex-grow">
	<div class="bg-white dark:bg-gray-900 text-white p-4 flex-grow flex">
		<slot />
	</div>
</div>
