<script lang="ts">
	import NavBar from './NavBar.svelte';

	export let fullScreen: boolean = false;
</script>

<div class:h-screen={fullScreen} class="flex flex-grow flex-col p-4">
	<div class="mb-4">
		<NavBar />
	</div>
	<slot />
</div>
