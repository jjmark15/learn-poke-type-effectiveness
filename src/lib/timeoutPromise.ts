export class TimeoutPromise {
	private _promise: Promise<void>;
	private _resolved = false;

	private constructor(promise: Promise<void>) {
		this._promise = promise;

		this._promise.finally(() => {
			this._resolved = true;
		});
	}

	public isComplete(): boolean {
		return this._resolved;
	}

	public static completed(): TimeoutPromise {
		const p = new TimeoutPromise(Promise.resolve());
		p._resolved = true;

		return p;
	}

	public static fromMillis(durationMs: number): TimeoutPromise {
		const promise = TimeoutPromise.timeoutPromise(durationMs);

		return new TimeoutPromise(promise);
	}

	private static timeoutPromise(durationMs: number): Promise<void> {
		return new Promise(function (resolve) {
			setTimeout(() => {
				resolve();
			}, durationMs);
		});
	}
}
