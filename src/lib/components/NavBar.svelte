<script lang="ts">
	import { user } from '$lib/sessionStore';
</script>

<nav class="font-striking">
	<a data-sveltekit-prefetch href="/">home</a>
	<a data-sveltekit-prefetch href="/failures">failures</a>
	<a data-sveltekit-prefetch href="/elements">elements</a>
	{#if !$user.active()}
		<a data-sveltekit-prefetch href="/login">login</a>
	{/if}
</nav>

<style>
	nav {
		@apply flex flex-row flex-wrap mr-auto;

		a {
			@apply bg-button-background-color dark:bg-dark-button-background-color 
			text-2xl py-1 px-2 mr-2 mb-2
			rounded-lg shadow-md;
		}
	}
</style>
