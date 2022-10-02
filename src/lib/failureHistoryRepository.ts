import { openDB, type DBSchema } from 'idb';
import type { IDBPDatabase } from 'idb';
import { Scenario } from './scenario';
import { elementString, parseElementString } from './element';

const DATABASE_NAME = 'failure_history';
const OBJECT_STORE_NAME = 'failures';
const HISTORY_OBJECT_KEY = 'history';
const DB_VERSION = 1;
const MAX_HISTORY_LENGTH = 20;

interface FailureHistorySchema extends DBSchema {
	failures: {
		key: string;
		value: SerializedScenario[];
	};
}

interface SerializedScenario {
	damageElement: string;
	defendingElement: string;
}

export interface FailureHistoryRepository {
	get(): Promise<Scenario[]>;

	recordFailure(scenario: Scenario): Promise<void>;
}

export class IndexedDbFailureHistoryRepository implements FailureHistoryRepository {
	private dbPromise: Promise<IDBPDatabase<FailureHistorySchema>>;

	private async lazyDbPromise(): Promise<IDBPDatabase<FailureHistorySchema>> {
		if (this.dbPromise === undefined) {
			this.dbPromise = openDB<FailureHistorySchema>(DATABASE_NAME, DB_VERSION, {
				upgrade(db) {
					db.createObjectStore(OBJECT_STORE_NAME);
				}
			});
		}

		return this.dbPromise;
	}

	public async get(): Promise<Scenario[]> {
		try {
			const serializedScenarios = await this.getSerialized();
			return serializedScenarios.map(deserializeScenario);
		} catch (error) {
			return [];
		}
	}

	private async getSerialized(): Promise<SerializedScenario[]> {
		try {
			const db = await this.lazyDbPromise();
			return (await db.get(OBJECT_STORE_NAME, HISTORY_OBJECT_KEY)) || [];
		} catch (error) {
			return [];
		}
	}

	public async recordFailure(scenario: Scenario): Promise<void> {
		const db = await this.lazyDbPromise();

		let history: SerializedScenario[] = await this.getSerialized();
		const indexEnd = Math.max(MAX_HISTORY_LENGTH, history.length - 1);
		history = [serializeScenario(scenario), ...history].slice(0, indexEnd);

		await db.put(OBJECT_STORE_NAME, history, HISTORY_OBJECT_KEY);
	}
}

function serializeScenario(scenario: Scenario): SerializedScenario {
	return {
		damageElement: elementString(scenario.offensiveElement()),
		defendingElement: elementString(scenario.defensiveElement())
	};
}

function deserializeScenario(serialized: SerializedScenario): Scenario {
	return new Scenario(
		parseElementString(serialized.damageElement),
		parseElementString(serialized.defendingElement)
	);
}
