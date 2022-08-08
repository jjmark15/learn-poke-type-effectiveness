<script lang="ts">
	export let streak: number = 0;
	export let bestStreak: number;
	let classNames: string = '';
	export { classNames as class };
</script>

<p class="dark:text-white {classNames}">
	Current streak: {streak}
	{#if bestStreak !== undefined}
		<span class="text-pink-50 dark:text-gray-500">({bestStreak})</span>
	{/if}
</p>
