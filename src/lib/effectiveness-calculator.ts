import { Effectiveness } from './effectiveness';
import { PokemonElement } from './element';

export class EffectivenessCalculator {
	public calculate(damageElement: PokemonElement, defendingElement: PokemonElement): Effectiveness {
		switch (damageElement) {
			case PokemonElement.Bug:
				return this.bugDamageEffectiveness(defendingElement);
			case PokemonElement.Dark:
				return this.darkDamageEffectiveness(defendingElement);
			case PokemonElement.Dragon:
				return this.dragonDamageEffectiveness(defendingElement);
			case PokemonElement.Electric:
				return this.electricDamageEffectiveness(defendingElement);
			case PokemonElement.Fairy:
				return this.fairyDamageEffectiveness(defendingElement);
			case PokemonElement.Fighting:
				return this.fightingDamageEffectiveness(defendingElement);
			case PokemonElement.Fire:
				return this.fireDamageEffectiveness(defendingElement);
			case PokemonElement.Flying:
				return this.flyingDamageEffectiveness(defendingElement);
			case PokemonElement.Ghost:
				return this.ghostDamageEffectiveness(defendingElement);
			case PokemonElement.Grass:
				return this.grassDamageEffectiveness(defendingElement);
			case PokemonElement.Ground:
				return this.groundDamageEffectiveness(defendingElement);
			case PokemonElement.Ice:
				return this.iceDamageEffectiveness(defendingElement);
			case PokemonElement.Normal:
				return this.normalDamageEffectiveness(defendingElement);
			case PokemonElement.Poison:
				return this.poisonDamageEffectiveness(defendingElement);
			case PokemonElement.Psychic:
				return this.psychicDamageEffectiveness(defendingElement);
			case PokemonElement.Rock:
				return this.rockDamageEffectiveness(defendingElement);
			case PokemonElement.Steel:
				return this.steelDamageEffectiveness(defendingElement);
			case PokemonElement.Water:
				return this.waterDamageEffectiveness(defendingElement);
		}
	}

	private bugDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
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
		).effectiveness(defendingElement);
	}

	private darkDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fighting, PokemonElement.Dark, PokemonElement.Fairy],
			[PokemonElement.Psychic, PokemonElement.Ghost]
		).effectiveness(defendingElement);
	}

	private dragonDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Fairy],
			[PokemonElement.Steel],
			[PokemonElement.Dragon]
		).effectiveness(defendingElement);
	}

	private electricDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Ground],
			[PokemonElement.Electric, PokemonElement.Grass, PokemonElement.Dragon],
			[PokemonElement.Water, PokemonElement.Flying]
		).effectiveness(defendingElement);
	}

	private fairyDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Poison, PokemonElement.Steel],
			[PokemonElement.Fighting, PokemonElement.Dragon, PokemonElement.Dark]
		).effectiveness(defendingElement);
	}

	private fightingDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
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
				PokemonElement.Steel
			]
		).effectiveness(defendingElement);
	}

	private fireDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Rock, PokemonElement.Dragon],
			[PokemonElement.Grass, PokemonElement.Ice, PokemonElement.Bug, PokemonElement.Steel]
		).effectiveness(defendingElement);
	}

	private flyingDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Electric, PokemonElement.Rock, PokemonElement.Steel],
			[PokemonElement.Grass, PokemonElement.Fighting, PokemonElement.Bug]
		).effectiveness(defendingElement);
	}

	private ghostDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Normal],
			[PokemonElement.Dark],
			[PokemonElement.Psychic, PokemonElement.Ghost]
		).effectiveness(defendingElement);
	}

	private grassDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
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
		).effectiveness(defendingElement);
	}

	private groundDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
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
		).effectiveness(defendingElement);
	}

	private iceDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Ice, PokemonElement.Steel],
			[PokemonElement.Grass, PokemonElement.Ground, PokemonElement.Flying, PokemonElement.Dragon]
		).effectiveness(defendingElement);
	}

	private normalDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Ghost],
			[PokemonElement.Rock, PokemonElement.Steel],
			[]
		).effectiveness(defendingElement);
	}

	private poisonDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Steel],
			[PokemonElement.Poison, PokemonElement.Ground, PokemonElement.Rock, PokemonElement.Ghost],
			[PokemonElement.Grass, PokemonElement.Fairy]
		).effectiveness(defendingElement);
	}

	private psychicDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[PokemonElement.Dark],
			[PokemonElement.Psychic, PokemonElement.Steel],
			[PokemonElement.Fighting, PokemonElement.Poison]
		).effectiveness(defendingElement);
	}

	private rockDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fighting, PokemonElement.Ground, PokemonElement.Steel],
			[PokemonElement.Fire, PokemonElement.Ice, PokemonElement.Flying, PokemonElement.Bug]
		).effectiveness(defendingElement);
	}

	private steelDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Fire, PokemonElement.Water, PokemonElement.Electric, PokemonElement.Steel],
			[PokemonElement.Ice, PokemonElement.Rock, PokemonElement.Fairy]
		).effectiveness(defendingElement);
	}

	private waterDamageEffectiveness(defendingElement: PokemonElement): Effectiveness {
		return new ElementDamageEffectiveness(
			[],
			[PokemonElement.Water, PokemonElement.Grass, PokemonElement.Dragon],
			[PokemonElement.Fire, PokemonElement.Ground, PokemonElement.Rock]
		).effectiveness(defendingElement);
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

	public effectiveness(defendingElement: PokemonElement): Effectiveness {
		if (this.zero.includes(defendingElement)) {
			return Effectiveness.Zero;
		} else if (this.half.includes(defendingElement)) {
			return Effectiveness.Half;
		} else if (this.double.includes(defendingElement)) {
			return Effectiveness.Double;
		} else {
			return Effectiveness.Single;
		}
	}
}
