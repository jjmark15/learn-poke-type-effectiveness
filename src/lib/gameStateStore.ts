import { readable } from 'svelte/store';
import { GameState } from './gameState';
import { HighScoreRepositoryFactory } from './highScoreRepositoryFactory';
import { IndexedDbFailureHistoryRepository } from './failureHistoryRepository';
import { EffectivenessCalculator } from './effectivenessCalculator';
import { ExhaustiveScenarioGenerator } from './scenarioGenerator';
import { StreakCounter } from './streakCounter';

export const gameState = readable(
	new GameState(
		HighScoreRepositoryFactory.create(),
		new IndexedDbFailureHistoryRepository(),
		new EffectivenessCalculator(),
		ExhaustiveScenarioGenerator.default(),
		StreakCounter.default()
	)
);
