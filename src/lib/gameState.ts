import type { Effectiveness } from './effectiveness';
import type { EffectivenessCalculator } from './effectivenessCalculator';
import type { FailureHistoryRepository } from './failureHistoryRepository';
import type { HighScoreRepository } from './highScoreRepository';
import type { Scenario } from './scenario';
import type { ScenarioGenerator } from './scenarioGenerator';
import type { StreakCounter } from './streakCounter';

export class GameState<
	HSR extends HighScoreRepository,
	SFH extends FailureHistoryRepository,
	SG extends ScenarioGenerator
> {
	private _scenario?: Scenario;
	private highScoreRepository: HSR;
	private scenarioFailureHistoryRepository: SFH;
	private effectivenessCalculator: EffectivenessCalculator;
	private scenarioGenerator: SG;
	private streakCounter: StreakCounter;
	private _selectedEffectiveness?: Effectiveness;

	constructor(
		highScoreRepository: HSR,
		scenarioFailureHistoryRepository: SFH,
		effectivenessCalculator: EffectivenessCalculator,
		scenarioGenerator: SG,
		streakCounter: StreakCounter
	) {
		this.highScoreRepository = highScoreRepository;
		this.scenarioFailureHistoryRepository = scenarioFailureHistoryRepository;
		this.effectivenessCalculator = effectivenessCalculator;
		this.scenarioGenerator = scenarioGenerator;
		this.streakCounter = streakCounter;
		this.generateNewScenario();
	}

	public correctEffectiveness(): Effectiveness {
		return this.effectivenessCalculator.calculate(
			this._scenario.damageElement(),
			this._scenario.defendingElement()
		);
	}

	public selectEffectiveness(effectiveness: Effectiveness): void {
		this._selectedEffectiveness = effectiveness;
		if (this.selectedEffectivenessIsCorrect()) {
			this.streakCounter.increment();
		} else {
			this.recordScenarioFailure(this.scenario());
		}
		this.updateStreakHighScoreIfBetter(this.streakCounter.value());
	}

	public selectedEffectivenessIsCorrect(): boolean {
		return this._selectedEffectiveness === this.correctEffectiveness();
	}

	public selectedEffectiveness(): Effectiveness {
		return this._selectedEffectiveness;
	}

	private generateNewScenario(): void {
		this._scenario = this.scenarioGenerator.generate();
	}

	public scenario(): Scenario {
		return this._scenario;
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

	private async updateStreakHighScoreIfBetter(newStreakValue: number) {
		const oldStreakValue: number = await this.highScoreRepository.get();
		if (newStreakValue > oldStreakValue) {
			await this.highScoreRepository.update(newStreakValue);
		}
	}

	private async recordScenarioFailure(scenario: Scenario): Promise<void> {
		await this.scenarioFailureHistoryRepository.recordFailure(scenario);
	}
}
