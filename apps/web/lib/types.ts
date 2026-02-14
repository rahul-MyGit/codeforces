
export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  color: string;
}

export interface formData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreeToTerms: boolean,
}


export interface signinFormData {
  email: string,
  password: string,
  rememberMe: boolean,
}


export interface DifficultyStats {
  solved: number;
  total: number;
};

export interface ProblemStats {
  easy: DifficultyStats;
  medium: DifficultyStats;
  hard: DifficultyStats;
};
