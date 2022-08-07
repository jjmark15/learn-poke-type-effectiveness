<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>


<div class="flex flex-row justify-start mb-2">
    <nav class="flex-grow">
        <a sveltekit:prefetch href="/">home</a>
        <a sveltekit:prefetch href="/failures">failures</a>
        <a sveltekit:prefetch href="/login">login</a>
    </nav>
    <DarkModeToggle class="ml-2" />
</div>
