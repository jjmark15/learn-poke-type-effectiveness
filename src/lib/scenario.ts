import type { PokemonElement } from './element';

export class Scenario {
	private _offensiveElement: PokemonElement;
	private _defensiveElement: PokemonElement;

	constructor(offensiveElement: PokemonElement, defensiveElement: PokemonElement) {
		this._offensiveElement = offensiveElement;
		this._defensiveElement = defensiveElement;
	}

	public offensiveElement(): PokemonElement {
		return this._offensiveElement;
	}

	public defensiveElement(): PokemonElement {
		return this._defensiveElement;
	}
}
