import type { HighScoreRepository } from './highScoreRepository';
import { TimeoutPromise } from './timeoutPromise';

export class CachedHighScoreRepository<T extends HighScoreRepository>
	implements HighScoreRepository
{
	private _cacheTimeout: TimeoutPromise;
	private _cacheTimeoutDurationMs: number;
	private _cachedValue = 0;
	private _inner: T;

	public constructor(highScoreRepository: T, cacheTimeoutDurationMs: number) {
		this._inner = highScoreRepository;
		this._cacheTimeoutDurationMs = cacheTimeoutDurationMs;
		this._cacheTimeout = TimeoutPromise.completed();
	}

	public async get(): Promise<number> {
		if (!this._cacheTimeout.isComplete()) {
			return this._cachedValue;
		}

		this._cachedValue = await this._inner.get();
		this.resetCacheTimeout();
		return this._cachedValue;
	}

	public async update(count: number): Promise<number> {
		this._cachedValue = await this._inner.update(count);
		this.resetCacheTimeout();
		return this._cachedValue;
	}

	private resetCacheTimeout() {
		this._cacheTimeout = new TimeoutPromise(this._cacheTimeoutDurationMs);
	}
}
