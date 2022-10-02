<script lang="ts">
	import { effectivenessString, type Effectiveness } from '$lib/effectiveness';

	let classNames: string = '';
	export { classNames as class };

	export let effectiveness: Effectiveness;

	function effectivenessClass(effectiveness: Effectiveness): string {
		return (
			'effectiveness--' + effectivenessString(effectiveness).toLowerCase().replaceAll(' ', '-')
		);
	}
</script>

<span class="{classNames} poke-icon {effectivenessClass(effectiveness)}"
	>{effectivenessString(effectiveness)}</span
>

<style>
	.effectiveness {
		&--no-effect {
			@apply bg-black text-yellow-200;
		}

		&--not-very-effective {
			@apply bg-red-400 text-yellow-200;
		}

		&--normal {
			@apply bg-white text-black;
		}

		&--super-effective {
			@apply bg-green-400 text-yellow-200;
		}
	}
</style>
