<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { ELEMENTS, PokemonElement } from '$lib/element';
	import ElementLabel, {} from '$lib/components/ElementLabel.svelte';

	const sortedElements: PokemonElement[] = [...ELEMENTS];
</script>

<svelte:head>
	<title>TODO</title>
</svelte:head>

<Page>
	<div class="flex flex-col">
		{#each sortedElements as element}
			<ElementLabel element={element}/>
		{/each}
	</div>
</Page>

