<script>
	import '../app.css';
	import { browser } from '$app/env';
</script>

<svelte:head>
	<meta property="og:title" content="PokeLearn" />
	<meta property="og:description" content="Learn Pokemon Type Effectiveness" />
	<meta property="og:type" content="website" />
	{#if browser}
		<meta property="og:url" content={window.location.href} />;
	{/if}
</svelte:head>

<div class="bg-gray-900 text-white p-4 flex-grow">
	<slot />
</div>
