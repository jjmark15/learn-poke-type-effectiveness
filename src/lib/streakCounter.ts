export class StreakCounter {
	private count: number;

	private constructor(count: number) {
		this.count = count;
	}

	public static default(): StreakCounter {
		return new StreakCounter(0);
	}

	public increment(): void {
		this.count += 1;
	}

	public reset(): void {
		this.count = 0;
	}

	public value(): number {
		return this.count;
	}
}
