import { IDBPDatabase, openDB } from 'idb';

const DATABASE_NAME = 'type_effec_learning';
const OBJECT_STORE_NAME = 'streak_high_score';
const HIGH_SCORE_VALUE_KEY = 'count';
const DB_VERSION = 1;

export class HighScoreRepository {
	private dbPromise: Promise<IDBPDatabase>;

	private lazyDbPromise() {
		if (this.dbPromise === undefined) {
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

	public async update(count: number): Promise<void> {
		const db = await this.lazyDbPromise();
		db.put(OBJECT_STORE_NAME, count, HIGH_SCORE_VALUE_KEY);
	}
}
