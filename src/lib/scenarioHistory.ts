import type { PokemonElement } from './element';
import type { Scenario } from './scenario';

export class ScenarioHistory {
	private history: Map<PokemonElement, Set<PokemonElement>>;

	constructor() {
		this.history = new Map();
	}

	public reset(): void {
		this.history.clear();
	}

	public record(scenario: Scenario): void {
		if (!this.history.has(scenario.offensiveElement())) {
			this.history.set(scenario.offensiveElement(), new Set());
		}
		const scenarioHistory: Set<PokemonElement> = this.history.get(scenario.offensiveElement());
		scenarioHistory.add(scenario.defensiveElement());
		this.history.set(scenario.offensiveElement(), scenarioHistory);
	}

	public offensiveElementScenariosAreExhausted(
		offensiveElement: PokemonElement,
		fullSet: Set<PokemonElement>
	): boolean {
		if (!this.history.has(offensiveElement)) {
			return false;
		}

		return this.history.get(offensiveElement).size === fullSet.size;
	}

	public defensiveElementHistoryForoffensiveElement(
		offensiveElement: PokemonElement
	): Set<PokemonElement> {
		if (this.history.has(offensiveElement)) {
			return this.history.get(offensiveElement);
		} else {
			return new Set();
		}
	}
}
