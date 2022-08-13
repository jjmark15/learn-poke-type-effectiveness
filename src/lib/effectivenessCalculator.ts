import { Effectiveness } from './effectiveness';
import { PokemonElement } from './element';

export class EffectivenessCalculator {
	public calculate(
		offensiveElement: PokemonElement,
		defensiveElement: PokemonElement
	): Effectiveness {
		switch (offensiveElement) {
			case PokemonElement.Bug:
				return this.bugDamageEffectiveness(defensiveElement);
			case PokemonElement.Dark:
				return this.darkDamageEffectiveness(defensiveElement);
			case PokemonElement.Dragon:
				return this.dragonDamageEffectiveness(defensiveElement);
			case PokemonElement.Electric:
				return this.electricDamageEffectiveness(defensiveElement);
			case PokemonElement.Fairy:
				return this.fairyDamageEffectiveness(defensiveElement);
			case PokemonElement.Fighting:
				return this.fightingDamageEffectiveness(defensiveElement);
			case PokemonElement.Fire:
				return this.fireDamageEffectiveness(defensiveElement);
			case PokemonElement.Flying:
				return this.flyingDamageEffectiveness(defensiveElement);
			case PokemonElement.Ghost:
				return this.ghostDamageEffectiveness(defensiveElement);
			case PokemonElement.Grass:
				return this.grassDamageEffectiveness(defensiveElement);
			case PokemonElement.Ground:
				return this.groundDamageEffectiveness(defensiveElement);
			case PokemonElement.Ice:
				return this.iceDamageEffectiveness(defensiveElement);
			case PokemonElement.Normal:
				return this.normalDamageEffectiveness(defensiveElement);
			case PokemonElement.Poison:
				return this.poisonDamageEffectiveness(defensiveElement);
			case PokemonElement.Psychic:
				return this.psychicDamageEffectiveness(defensiveElement);
			case PokemonElement.Rock:
				return this.rockDamageEffectiveness(defensiveElement);
			case PokemonElement.Steel:
				return this.steelDamageEffectiveness(defensiveElement);
			case PokemonElement.Water:
				return this.waterDamageEffectiveness(defensiveElement);
		}
	}

	private bugDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[
				PokemonElement.Fire,
				PokemonElement.Fighting,
				PokemonElement.Poison,
				PokemonElement.Flying,
				PokemonElement.Ghost,
				PokemonElement.Steel,
				PokemonElement.Fairy
			],
			[PokemonElement.Grass, PokemonElement.Psychic, PokemonElement.Dark]
		).effectiveness(defensiveElement);
	}

	private darkDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fighting, PokemonElement.Dark, PokemonElement.Fairy],
			[PokemonElement.Psychic, PokemonElement.Ghost]
		).effectiveness(defensiveElement);
	}

	private dragonDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Fairy],
			[PokemonElement.Steel],
			[PokemonElement.Dragon]
		).effectiveness(defensiveElement);
	}

	private electricDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Ground],
			[PokemonElement.Electric, PokemonElement.Grass, PokemonElement.Dragon],
			[PokemonElement.Water, PokemonElement.Flying]
		).effectiveness(defensiveElement);
	}

	private fairyDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Poison, PokemonElement.Steel],
			[PokemonElement.Fighting, PokemonElement.Dragon, PokemonElement.Dark]
		).effectiveness(defensiveElement);
	}

	private fightingDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Ghost],
			[
				PokemonElement.Poison,
				PokemonElement.Flying,
				PokemonElement.Psychic,
				PokemonElement.Bug,
				PokemonElement.Fairy
			],
			[
				PokemonElement.Normal,
				PokemonElement.Ice,
				PokemonElement.Bug,
				PokemonElement.Dark,
				PokemonElement.Rock,
				PokemonElement.Steel
			]
		).effectiveness(defensiveElement);
	}

	private fireDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Rock, PokemonElement.Dragon],
			[PokemonElement.Grass, PokemonElement.Ice, PokemonElement.Bug, PokemonElement.Steel]
		).effectiveness(defensiveElement);
	}

	private flyingDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Electric, PokemonElement.Rock, PokemonElement.Steel],
			[PokemonElement.Grass, PokemonElement.Fighting, PokemonElement.Bug]
		).effectiveness(defensiveElement);
	}

	private ghostDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Normal],
			[PokemonElement.Dark],
			[PokemonElement.Psychic, PokemonElement.Ghost]
		).effectiveness(defensiveElement);
	}

	private grassDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[
				PokemonElement.Fire,
				PokemonElement.Grass,
				PokemonElement.Poison,
				PokemonElement.Flying,
				PokemonElement.Bug,
				PokemonElement.Dragon,
				PokemonElement.Steel
			],
			[PokemonElement.Water, PokemonElement.Ground, PokemonElement.Rock]
		).effectiveness(defensiveElement);
	}

	private groundDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Flying],
			[PokemonElement.Grass, PokemonElement.Bug],
			[
				PokemonElement.Fire,
				PokemonElement.Electric,
				PokemonElement.Poison,
				PokemonElement.Rock,
				PokemonElement.Steel
			]
		).effectiveness(defensiveElement);
	}

	private iceDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Ice, PokemonElement.Steel],
			[PokemonElement.Grass, PokemonElement.Ground, PokemonElement.Flying, PokemonElement.Dragon]
		).effectiveness(defensiveElement);
	}

	private normalDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Ghost],
			[PokemonElement.Rock, PokemonElement.Steel],
			[]
		).effectiveness(defensiveElement);
	}

	private poisonDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Steel],
			[PokemonElement.Poison, PokemonElement.Ground, PokemonElement.Rock, PokemonElement.Ghost],
			[PokemonElement.Grass, PokemonElement.Fairy]
		).effectiveness(defensiveElement);
	}

	private psychicDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Dark],
			[PokemonElement.Psychic, PokemonElement.Steel],
			[PokemonElement.Fighting, PokemonElement.Poison]
		).effectiveness(defensiveElement);
	}

	private rockDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fighting, PokemonElement.Ground, PokemonElement.Steel],
			[PokemonElement.Fire, PokemonElement.Ice, PokemonElement.Flying, PokemonElement.Bug]
		).effectiveness(defensiveElement);
	}

	private steelDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Electric, PokemonElement.Steel],
			[PokemonElement.Ice, PokemonElement.Rock, PokemonElement.Fairy]
		).effectiveness(defensiveElement);
	}

	private waterDamageEffectiveness(defensiveElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Water, PokemonElement.Grass, PokemonElement.Dragon],
			[PokemonElement.Fire, PokemonElement.Ground, PokemonElement.Rock]
		).effectiveness(defensiveElement);
	}
}

class ElementDamageEffectiveness {
	zero: Array<PokemonElement>;
	half: Array<PokemonElement>;
	double: Array<PokemonElement>;

	constructor(
		zero: Array<PokemonElement>,
		half: Array<PokemonElement>,
		double: Array<PokemonElement>
	) {
		this.zero = zero;
		this.half = half;
		this.double = double;
	}

	public effectiveness(defensiveElement: PokemonElement): Effectiveness {
		if (this.zero.includes(defensiveElement)) {
			return Effectiveness.Zero;
		} else if (this.half.includes(defensiveElement)) {
			return Effectiveness.Half;
		} else if (this.double.includes(defensiveElement)) {
			return Effectiveness.Double;
		} else {
			return Effectiveness.Single;
		}
	}
}
