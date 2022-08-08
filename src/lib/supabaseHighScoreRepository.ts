import { get } from 'svelte/store';
import type { HighScoreRepository } from './high-score-repository';
import { user } from './sessionStore';
import { supabaseClient } from './supabaseClient';

export class SupabaseHighScoreRepository implements HighScoreRepository {
	public async get(): Promise<number> {
		if (!this.sessionActive()) {
			return 0;
		}

		const user_id = supabaseClient.auth.user()?.id;
		const { data, error } = await supabaseClient
			.from('high_scores')
			.select(`id, high_score`)
			.eq('id', user_id)
			.single();
		if (error != null) {
			if (error.code === 'PGRST116') {
				console.debug('No high score data for user: ' + user_id);
				return 0;
			}
			console.warn(error.message);
			return 0;
		}
		return data.high_score;
	}

	public async update(count: number): Promise<number> {
		if (!this.sessionActive()) {
			return 0;
		}

		console.log('pushing update');
		const user = supabaseClient.auth.user();
		const { data, error } = await supabaseClient
			.from('high_scores')
			.upsert({ id: user?.id, high_score: count })
			.eq('id', user?.id)
			.single();
		if (error != null) {
			console.warn(error.message);
			return 0;
		}

		return data.high_score;
	}

	private sessionActive(): boolean {
		return get(user).active();
	}
}
