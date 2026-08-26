import type { FindErrorAnswer } from "../../../service/features/activity/activitySliceType";

export interface FindErrorRulesProps {
    onStartGame: () => void;
}

export interface FindErrorGameProps {
    onEndGame: (answers: FindErrorAnswer[]) => void;
}

export interface FindErrorSuccessProps {
    status: boolean;
    reward?: number;
    correctAnswers?: number;
}