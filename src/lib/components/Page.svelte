<script lang="ts">
	import NavBar from './NavBar.svelte';
</script>

<div class="flex flex-grow flex-col p-4">
	<NavBar />
    <slot />
</div>