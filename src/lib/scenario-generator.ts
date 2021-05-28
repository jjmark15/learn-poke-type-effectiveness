import { ELEMENTS, PokemonElement } from './element';
import { selectRandomMember } from './random';
import { Scenario } from './scenario';
import { ScenarioHistory } from './scenario-history';

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
		const damageElement: PokemonElement = this.getRandomNonExhaustedDamageElement();
		const defendingElement: PokemonElement = this.getRandomElementExcluding(
			this.scenarioHistory.defendingElementHistoryForDamageElement(damageElement)
		);
		const newScenario: Scenario = new Scenario(damageElement, defendingElement);
		this.addScenarioToHistory(newScenario);
		return newScenario;
	}

	private getRandomElementExcluding(exclusions: Set<PokemonElement>): PokemonElement {
		const remaining = [...this.elements].filter((element) => {
			return !exclusions.has(element);
		});
		return selectRandomMember(remaining);
	}

	private getRandomNonExhaustedDamageElement(): PokemonElement {
		const nonExhausted: Array<PokemonElement> = [...this.elements].filter((element) => {
			return !this.scenarioHistory.damageElementScenariosAreExhausted(element, this.elements);
		});
		try {
			return selectRandomMember(nonExhausted);
		} catch (error) {
			this.scenarioHistory.reset();
			return this.getRandomNonExhaustedDamageElement();
		}
	}

	private addScenarioToHistory(scenario: Scenario): void {
		this.scenarioHistory.record(scenario);
	}
}
