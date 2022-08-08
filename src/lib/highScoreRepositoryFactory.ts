import { CachedHighScoreRepository } from './cachedHighScoreRepository';
import type { HighScoreRepository } from './highScoreRepository';
import { IndexedDbHighScoreRepository } from './indexedDbHighScoreRepository';
import { LocalAndRemoteHighScoreRepository } from './localAndRemoteHighScoreRepository';
import { SupabaseHighScoreRepository } from './supabaseHighScoreRepository';

const remoteEnabled: boolean = JSON.parse(import.meta.env.VITE_ENABLE_REMOTE_DB || 'true');

export class HighScoreRepositoryFactory {
	public static create(): HighScoreRepository {
		if (!remoteEnabled) {
			return new IndexedDbHighScoreRepository();
		}

		return new LocalAndRemoteHighScoreRepository(
			new IndexedDbHighScoreRepository(),
			new CachedHighScoreRepository(new SupabaseHighScoreRepository(), 60000)
		);
	}

	public static withoutCaching(): HighScoreRepository {
		if (!remoteEnabled) {
			return new IndexedDbHighScoreRepository();
		}

		return new LocalAndRemoteHighScoreRepository(
			new IndexedDbHighScoreRepository(),
			new SupabaseHighScoreRepository()
		);
	}
}
