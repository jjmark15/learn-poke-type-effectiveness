<script lang="ts">
	import { elementString, PokemonElement } from '../element';

	export let element: PokemonElement;

	let classNames: string = '';
	export { classNames as class };

	function elementClass(element: PokemonElement): string {
		return 'pokemon-element--' + elementString(element).toLowerCase();
	}
</script>

<div class="{classNames} {elementClass(element)}">{elementString(element)}</div>

<style>
	div {
		@apply rounded-md h-fit w-fit px-1;
	}

	.pokemon-element {
		&--bug {
			background-color: #aabb22;
		}

		&--dark {
			background-color: #775544;
		}

		&--dragon {
			background-color: #7766ee;
		}

		&--electric {
			background-color: #ffcc33;
		}

		&--fairy {
			background-color: #ee99ee;
		}

		&--fighting {
			background-color: #bb5544;
		}

		&--fire {
			background-color: #ff4422;
		}

		&--flying {
			background-color: #8899ff;
		}

		&--ghost {
			background-color: #6666bb;
		}

		&--grass {
			background-color: #77cc55;
		}

		&--ground {
			background-color: #ddbb55;
		}

		&--ice {
			background-color: #66ccff;
		}

		&--normal {
			background-color: #aaaa99;
		}

		&--poison {
			background-color: #aa5599;
		}

		&--psychic {
			background-color: #ff5599;
		}

		&--rock {
			background-color: #bbaa66;
		}

		&--steel {
			background-color: #aaaabb;
		}

		&--water {
			background-color: #3399ff;
		}
	}
</style>
