<script lang="ts">
	import NavBar from './NavBar.svelte';

	export let fullScreen: boolean = false;
</script>

<div class:h-screen={fullScreen} class="flex flex-grow flex-col p-4">
	<div>
		<NavBar />
	</div>
	<slot />
</div>
