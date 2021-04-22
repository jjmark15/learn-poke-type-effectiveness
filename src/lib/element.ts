export enum PokemonElement {
	Bug,
	Dragon,
	Dark,
	Electric,
	Fairy,
	Fighting,
	Fire,
	Flying,
	Ghost,
	Grass,
	Ground,
	Ice,
	Normal,
	Poison,
	Psychic,
	Rock,
	Steel,
	Water
}

export function elementString(element: PokemonElement): string {
	switch (element) {
		case PokemonElement.Bug:
			return 'Bug';
		case PokemonElement.Dark:
			return 'Dark';
		case PokemonElement.Dragon:
			return 'Dragon';
		case PokemonElement.Electric:
			return 'Electric';
		case PokemonElement.Fairy:
			return 'Fairy';
		case PokemonElement.Fighting:
			return 'Fighting';
		case PokemonElement.Fire:
			return 'Fire';
		case PokemonElement.Flying:
			return 'Flying';
		case PokemonElement.Ghost:
			return 'Ghost';
		case PokemonElement.Grass:
			return 'Grass';
		case PokemonElement.Ground:
			return 'Ground';
		case PokemonElement.Ice:
			return 'Ice';
		case PokemonElement.Normal:
			return 'Normal';
		case PokemonElement.Poison:
			return 'Poison';
		case PokemonElement.Psychic:
			return 'Psychic';
		case PokemonElement.Rock:
			return 'Rock';
		case PokemonElement.Steel:
			return 'Steel';
		case PokemonElement.Water:
			return 'Water';
	}
}
