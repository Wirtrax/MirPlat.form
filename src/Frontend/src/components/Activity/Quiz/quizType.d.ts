import type { QuizQuestion } from "../../../mock/quiz";

export interface QuizSuccessProps {
    success?: boolean;
    error?: boolean;
}

export interface QuizStepProps {
  data: QuizQuestion;
  onNext: (answer: string) => void;
}
