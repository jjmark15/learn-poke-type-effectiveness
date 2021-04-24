<script>
	import '../app.postcss';
	import { browser } from '$app/env';
</script>

<svelte:head>
	<meta property="og:title" content="Learn Pokemon Type Effectiveness" />
	<meta property="og:description" content="Learn Pokemon Type Effectiveness" />
	<meta property="og:type" content="website" />
	{#if browser}
		<meta property="og:url" content={window.location.href} />;
	{/if}
</svelte:head>

<slot />
