<script lang="ts">
	import { fade } from 'svelte/transition';

	export let streak: number = 0;
	export let bestStreak: number;
	let classNames: string = '';
	export { classNames as class };
</script>

<p class={classNames}>
	Current streak: {streak}
	{#if bestStreak !== undefined}
		<span in:fade class="text-pink-50 dark:text-gray-500">({bestStreak})</span>
	{/if}
</p>
