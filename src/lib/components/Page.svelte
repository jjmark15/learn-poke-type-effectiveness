<script lang="ts">
	import PageHeader from './PageHeader.svelte';

	export let fullScreen: boolean = false;

	let windowHeight: number;
	$: heightStyle = fullScreen ? 'height: ' + windowHeight + 'px' : null;
</script>

<svelte:window bind:innerHeight={windowHeight} />

<div style={heightStyle} class="flex flex-grow flex-col p-4">
	<PageHeader />
	<slot />
</div>
