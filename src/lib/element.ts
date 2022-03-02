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

export const ELEMENTS: Set<PokemonElement> = new Set([
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

export function parseElementString(elementString: string): PokemonElement {
	switch (elementString) {
		case 'Bug':
			return PokemonElement.Bug;
		case 'Dark':
			return PokemonElement.Dark;
		case 'Dragon':
			return PokemonElement.Dragon;
		case 'Electric':
			return PokemonElement.Electric;
		case 'Fairy':
			return PokemonElement.Fairy;
		case 'Fighting':
			return PokemonElement.Fighting;
		case 'Fire':
			return PokemonElement.Fire;
		case 'Flying':
			return PokemonElement.Flying;
		case 'Ghost':
			return PokemonElement.Ghost;
		case 'Grass':
			return PokemonElement.Grass;
		case 'Ground':
			return PokemonElement.Ground;
		case 'Ice':
			return PokemonElement.Ice;
		case 'Normal':
			return PokemonElement.Normal;
		case 'Poison':
			return PokemonElement.Poison;
		case 'Psychic':
			return PokemonElement.Psychic;
		case 'Rock':
			return PokemonElement.Rock;
		case 'Steel':
			return PokemonElement.Steel;
		case 'Water':
			return PokemonElement.Water;
	}
}
