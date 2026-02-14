export interface DifficultyStats {
  solved: number;
  total: number;
};

export interface ProblemStats {
  easy: DifficultyStats;
  medium: DifficultyStats;
  hard: DifficultyStats;
};
