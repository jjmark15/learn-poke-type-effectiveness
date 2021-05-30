import { IDBPDatabase, openDB } from 'idb';
import { Err, Ok, Result } from 'ts-results';

const DATABASE_NAME = 'type_effec_learning';
const OBJECT_STORE_NAME = 'streak_high_score';
const HIGH_SCORE_VALUE_KEY = 'count';
const DB_VERSION = 1;

export interface HighScoreRepository {
	get(): Promise<Result<number, GetHighScoreError>>;

	update(count: number): Promise<void>;
}

export class IndexedDbHighScoreRepository implements HighScoreRepository {
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

	public async get(): Promise<Result<number, GetHighScoreError>> {
		try {
			const db = await this.lazyDbPromise();
			const score = (await db.get(OBJECT_STORE_NAME, HIGH_SCORE_VALUE_KEY)) || 0;
			return new Ok(score);
		} catch (error) {
			return new Err(new GetHighScoreError());
		}
	}

	public async update(count: number): Promise<void> {
		const db = await this.lazyDbPromise();
		await db.put(OBJECT_STORE_NAME, count, HIGH_SCORE_VALUE_KEY);
	}
}

export class GetHighScoreError extends Error {
	constructor() {
		super('failed to get highscore');
	}
}
