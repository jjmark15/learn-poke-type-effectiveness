export class TimeoutPromise {
	private _promise: Promise<void>;
	private _resolved = false;

	constructor(durationMs: number) {
		this._promise = TimeoutPromise.timeoutPromise(durationMs);

		this._promise.finally(() => {
			this._resolved = true;
		});
	}

	public isComplete(): boolean {
		return this._resolved;
	}

	public static completed(): TimeoutPromise {
		const p = new TimeoutPromise(0);
		p._resolved = true;

		return p;
	}

	private static timeoutPromise(durationMs: number): Promise<void> {
		return new Promise(function (resolve) {
			setTimeout(() => {
				resolve();
			}, durationMs);
		});
	}
}
