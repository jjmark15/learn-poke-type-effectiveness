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
		if (!this.history.has(scenario.damageElement())) {
			this.history.set(scenario.damageElement(), new Set());
		}
		const scenarioHistory: Set<PokemonElement> = this.history.get(scenario.damageElement());
		scenarioHistory.add(scenario.defendingElement());
		this.history.set(scenario.damageElement(), scenarioHistory);
	}

	public damageElementScenariosAreExhausted(
		damageElement: PokemonElement,
		fullSet: Set<PokemonElement>
	): boolean {
		if (!this.history.has(damageElement)) {
			return false;
		}

		return this.history.get(damageElement).size === fullSet.size;
	}

	public defendingElementHistoryForDamageElement(
		damageElement: PokemonElement
	): Set<PokemonElement> {
		if (this.history.has(damageElement)) {
			return this.history.get(damageElement);
		} else {
			return new Set();
		}
	}
}
