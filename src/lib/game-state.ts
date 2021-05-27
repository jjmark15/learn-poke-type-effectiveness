import type { Effectiveness } from './effectiveness';
import type { EffectivenessCalculator } from './effectiveness-calculator';
import type { PokemonElement } from './element';
import type { HighScoreRepository } from './high-score-repository';
import type { RandomElementSelector } from './random-element-selector';
import type { StreakCounter } from './streak-counter';

export class GameState {
	private _damageElement?: PokemonElement;
	private _defendingElement?: PokemonElement;
	private highScoreRepository: HighScoreRepository;
	private effectivenessCalculator: EffectivenessCalculator;
	private elementSelector: RandomElementSelector;
	private streakCounter: StreakCounter;
	private _selectedEffectiveness?: Effectiveness;

	constructor(
		highScoreRepository: HighScoreRepository,
		effectivenessCalculator: EffectivenessCalculator,
		elementSelector: RandomElementSelector,
		streakCounter: StreakCounter
	) {
		this.highScoreRepository = highScoreRepository;
		this.effectivenessCalculator = effectivenessCalculator;
		this.elementSelector = elementSelector;
		this.streakCounter = streakCounter;
		this.generateNewScenario();
	}

	public correctEffectiveness(): Effectiveness {
		return this.effectivenessCalculator.calculate(this._damageElement, this._defendingElement);
	}

	public selectEffectiveness(effectiveness: Effectiveness): void {
		this._selectedEffectiveness = effectiveness;
		this.incrementStreakIfAnswerIsCorrect();
		this.updateStreakHighScoreIfBetter(this.streakCounter.value());
	}

	public selectedEffectivenessIsCorrect(): boolean {
		return this._selectedEffectiveness === this.correctEffectiveness();
	}

	public selectedEffectiveness(): Effectiveness {
		return this._selectedEffectiveness;
	}

	private generateNewScenario(): void {
		this._damageElement = this.elementSelector.generate();
		this._defendingElement = this.elementSelector.generate();
	}

	public damageElement(): PokemonElement {
		return this._damageElement;
	}

	public defendingElement(): PokemonElement {
		return this._defendingElement;
	}

	public async highScore(): Promise<number> {
		return await this.highScoreRepository.get();
	}

	public currentStreak(): number {
		return this.streakCounter.value();
	}

	public proceedToNextScenario(): void {
		if (!this.selectedEffectivenessIsCorrect()) {
			this.streakCounter.reset();
		}
		this.generateNewScenario();
		this._selectedEffectiveness = undefined;
	}

	public startingANewStreak(): boolean {
		return this.streakCounter.value() === 0;
	}

	private incrementStreakIfAnswerIsCorrect(): void {
		if (this.selectedEffectivenessIsCorrect()) {
			this.streakCounter.increment();
		}
	}

	private async updateStreakHighScoreIfBetter(newStreakValue: number) {
		const oldStreakValue: number = await this.highScoreRepository.get();
		if (newStreakValue > oldStreakValue) {
			this.highScoreRepository.update(newStreakValue);
		}
	}
}
