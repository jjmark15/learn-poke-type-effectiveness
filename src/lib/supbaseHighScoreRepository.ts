import type { HighScoreRepository } from './high-score-repository';
import { supabaseClient } from './supabaseClient';

export class SupabaseHighScoreRepository implements HighScoreRepository {
	public async get(): Promise<number> {
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

	public async update(count: number): Promise<void> {
		const user = supabaseClient.auth.user();
		const { error } = await supabaseClient
			.from('high_scores')
			.upsert({ id: user?.id, high_score: count })
			.eq('id', user?.id)
			.single();
		if (error != null) {
			console.warn(error.message);
		}
	}
}
