<script lang="ts">
	export let streak: number = 0;
	export let bestStreak: number = 0;
	let classNames: string = '';
	export { classNames as class };
</script>

<p class="dark:text-white {classNames}">
	Current streak: {streak}
	<span class="text-pink-50 dark:text-gray-500">({bestStreak})</span>
</p>
