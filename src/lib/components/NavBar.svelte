<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import { user } from '$lib/sessionStore';
</script>

<div class="flex flex-row justify-start mb-2">
	<nav class="flex-grow">
		<a sveltekit:prefetch href="/">home</a>
		<a sveltekit:prefetch href="/failures">failures</a>
		{#if $user.active()}
			<a sveltekit:prefetch href="/login">login</a>
		{/if}
	</nav>
	<DarkModeToggle class="ml-2" />
</div>
