import { PokemonElement } from './element';

export class RandomElementSelector {
	private elements: Array<PokemonElement>;

	constructor(elements: Array<PokemonElement>) {
		this.elements = elements;
	}

	public static default(): RandomElementSelector {
		return new RandomElementSelector([
			PokemonElement.Bug,
			PokemonElement.Dark,
			PokemonElement.Dragon,
			PokemonElement.Electric,
			PokemonElement.Fairy,
			PokemonElement.Fighting,
			PokemonElement.Fire,
			PokemonElement.Flying,
			PokemonElement.Ghost,
			PokemonElement.Grass,
			PokemonElement.Ground,
			PokemonElement.Ice,
			PokemonElement.Normal,
			PokemonElement.Poison,
			PokemonElement.Psychic,
			PokemonElement.Rock,
			PokemonElement.Steel,
			PokemonElement.Water
		]);
	}

	public generate(): PokemonElement {
		const length = this.elements.length;
		return Math.floor(Math.random() * length);
	}
}
