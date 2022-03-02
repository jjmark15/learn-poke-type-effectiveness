import type { Effectiveness } from './effectiveness';
import type { EffectivenessCalculator } from './effectiveness-calculator';
import type { FailureHistoryRepository } from './failure-history-repository';
import type { HighScoreRepository } from './high-score-repository';
import type { Scenario } from './scenario';
import type { ScenarioGenerator } from './scenario-generator';
import type { StreakCounter } from './streak-counter';

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

	public async proceedToNextScenario(): Promise<void> {
		if (!this.selectedEffectivenessIsCorrect()) {
			this.streakCounter.reset();
			await this.recordScenarioFailure(this.scenario());
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
			await this.highScoreRepository.update(newStreakValue);
		}
	}

	private async recordScenarioFailure(scenario: Scenario): Promise<void> {
		await this.scenarioFailureHistoryRepository.recordFailure(scenario);
	}
}
