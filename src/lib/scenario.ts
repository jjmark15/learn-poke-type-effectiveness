import type { PokemonElement } from './element';

export class Scenario {
	private _damageElement: PokemonElement;
	private _defendingElement: PokemonElement;

	constructor(damageElement: PokemonElement, defendingElement: PokemonElement) {
		this._damageElement = damageElement;
		this._defendingElement = defendingElement;
	}

	public damageElement(): PokemonElement {
		return this._damageElement;
	}

	public defendingElement(): PokemonElement {
		return this._defendingElement;
	}
}
