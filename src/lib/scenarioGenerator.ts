import { ELEMENTS, PokemonElement } from './element';
import { selectRandomMember } from './random';
import { Scenario } from './scenario';
import { ScenarioHistory } from './scenarioHistory';

export interface ScenarioGenerator {
	generate(): Scenario;
}

export class ExhaustiveScenarioGenerator implements ScenarioGenerator {
	private scenarioHistory: ScenarioHistory;
	private elements: Set<PokemonElement>;

	constructor(elements: Set<PokemonElement>) {
		this.scenarioHistory = new ScenarioHistory();
		this.elements = elements;
	}

	public static default(): ExhaustiveScenarioGenerator {
		return new ExhaustiveScenarioGenerator(ELEMENTS);
	}

	generate(): Scenario {
		const offensiveElement: PokemonElement = this.getRandomNonExhaustedoffensiveElement();
		const defensiveElement: PokemonElement = this.getRandomElementExcluding(
			this.scenarioHistory.defensiveElementHistoryForoffensiveElement(offensiveElement)
		);
		const newScenario: Scenario = new Scenario(offensiveElement, defensiveElement);
		this.addScenarioToHistory(newScenario);
		return newScenario;
	}

	private getRandomElementExcluding(exclusions: Set<PokemonElement>): PokemonElement {
		const remaining = [...this.elements].filter((element) => {
			return !exclusions.has(element);
		});
		return selectRandomMember(remaining);
	}

	private getRandomNonExhaustedoffensiveElement(): PokemonElement {
		const nonExhausted: Array<PokemonElement> = [...this.elements].filter((element) => {
			return !this.scenarioHistory.offensiveElementScenariosAreExhausted(element, this.elements);
		});
		try {
			return selectRandomMember(nonExhausted);
		} catch (error) {
			this.scenarioHistory.reset();
			return this.getRandomNonExhaustedoffensiveElement();
		}
	}

	private addScenarioToHistory(scenario: Scenario): void {
		this.scenarioHistory.record(scenario);
	}
}
