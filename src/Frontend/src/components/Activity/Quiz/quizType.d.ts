import type { QuizQuestion } from "../../../mock/quiz";
import type { QuizAnswer } from "../../../service/features/activity/activitySliceType";

export interface QuizSuccessProps {
    success?: boolean;
    error?: boolean;
}

export interface QuizStepProps {
  data: QuizQuestion;
  onNext: (answer: string) => void;
}
