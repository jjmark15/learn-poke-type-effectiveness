export interface HighScoreRepository {
	get(): Promise<number>;

	update(count: number): Promise<number>;
}
