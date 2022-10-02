<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { ELEMENTS, PokemonElement } from '$lib/element';
	import ElementLabel from '$lib/components/ElementIcon.svelte';

	const sortedElements: PokemonElement[] = [...ELEMENTS];
</script>

<svelte:head>
	<title>Pokemon Elements</title>
</svelte:head>

<Page>
	<div class="flex flex-col">
		{#each sortedElements as element}
			<div class="mb-2 w-fit h-fit">
				<ElementLabel {element} />
			</div>
		{/each}
	</div>
</Page>
