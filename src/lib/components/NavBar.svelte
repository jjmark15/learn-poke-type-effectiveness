<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import { user } from '$lib/sessionStore';
</script>

<div class="flex flex-row justify-start">
	<nav class="flex-grow font-striking">
		<a data-sveltekit-prefetch href="/">home</a>
		<a data-sveltekit-prefetch href="/failures">failures</a>
		{#if !$user.active()}
			<a data-sveltekit-prefetch href="/login">login</a>
		{/if}
	</nav>
	<DarkModeToggle class="ml-2" />
</div>
