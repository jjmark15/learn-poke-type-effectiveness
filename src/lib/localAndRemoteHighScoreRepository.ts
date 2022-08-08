import type { HighScoreRepository } from './high-score-repository';

export class LocalAndRemoteHighScoreRepository implements HighScoreRepository {
	private local: HighScoreRepository;
	private remote: HighScoreRepository;

	constructor(local: HighScoreRepository, remote: HighScoreRepository) {
		this.local = local;
		this.remote = remote;
	}

	public async get(): Promise<number> {
		const [localHighScore, remoteHighScore] = await Promise.all([
			this.local.get(),
			this.remote.get()
		]);

		if (localHighScore > remoteHighScore) {
			await this.remote.update(localHighScore);
		}

		if (remoteHighScore > localHighScore) {
			await this.local.update(remoteHighScore);
		}

		return Math.max(localHighScore, remoteHighScore);
	}

	public async update(count: number): Promise<number> {
		const [newLocalValue, newRemoteValue] = await Promise.all([
			this.local.update(count),
			this.remote.update(count)
		]);
		return Math.max(newLocalValue, newRemoteValue);
	}
}
