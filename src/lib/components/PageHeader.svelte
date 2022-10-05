<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
    import NavBar from './NavBar.svelte';
</script>

<div class="flex flex-row justify-start">
    <NavBar />
	<DarkModeToggle class="ml-2 h-fit" />
</div>
