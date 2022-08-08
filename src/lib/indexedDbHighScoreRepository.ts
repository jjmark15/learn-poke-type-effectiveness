import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { HighScoreRepository } from './highScoreRepository';

const DATABASE_NAME = 'type_effec_learning';
const OBJECT_STORE_NAME = 'streak_high_score';
const HIGH_SCORE_VALUE_KEY = 'count';
const DB_VERSION = 1;

export class IndexedDbHighScoreRepository implements HighScoreRepository {
	private dbPromise: Promise<IDBPDatabase<unknown>>;

	private async lazyDbPromise(): Promise<IDBPDatabase<unknown>> {
		if (this.dbPromise === undefined) {
			await idbReady();

			this.dbPromise = openDB(DATABASE_NAME, DB_VERSION, {
				upgrade(db) {
					db.createObjectStore(OBJECT_STORE_NAME);
				}
			});
		}

		return this.dbPromise;
	}

	public async get(): Promise<number> {
		try {
			const db = await this.lazyDbPromise();
			return (await db.get(OBJECT_STORE_NAME, HIGH_SCORE_VALUE_KEY)) || 0;
		} catch (error) {
			return 0;
		}
	}

	public async update(count: number): Promise<number> {
		const db = await this.lazyDbPromise();
		await db.put(OBJECT_STORE_NAME, count, HIGH_SCORE_VALUE_KEY);
		return count;
	}
}

function idbReady(): Promise<void> {
	const isSafari =
		!navigator.userAgentData &&
		/Safari\//.test(navigator.userAgent) &&
		!/Chrom(e|ium)\//.test(navigator.userAgent);

	// No point putting other browsers or older versions of Safari through this mess.
	if (!isSafari || !indexedDB.databases) return Promise.resolve();

	let intervalId: NodeJS.Timer;

	return new Promise<void>((resolve) => {
		const tryIdb = () => indexedDB.databases().finally(resolve);
		intervalId = setInterval(tryIdb, 100);
		tryIdb();
	}).finally(() => clearInterval(intervalId));
}
