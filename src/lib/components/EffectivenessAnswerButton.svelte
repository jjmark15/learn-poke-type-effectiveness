<script lang="ts">
	import { Effectiveness, effectivenessString } from '$lib/effectiveness';

	function handleClick() {
		callback(effectiveness);
	}

	export let effectiveness: Effectiveness;
	export let callback: (effectiveness: Effectiveness) => void;
</script>

<button on:click={handleClick}>{effectivenessString(effectiveness)}</button>
