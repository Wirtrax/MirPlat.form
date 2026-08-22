export interface TetrisLinkResponse {
    link: string;
}

export interface TetrisSubmitResponse {
    message: string;
}

export interface TetrisStatusResponse {
    result: boolean;
}

export interface PhotoCheckSubmitResponse {
    message: string;
    status: 'claimed' | 'rejected';
}

export interface PhotoCheckStatusResponse {
    result: boolean;
}

export interface QuizAnswer {
    questionId: number;
    answer: string;
}

export interface QuizSubmitResponse {
    reward: number;
}

export interface QuizStatusResponse {
    result: boolean;
    reward: number;
}

export interface RebusSubmitResponse {
    succses: boolean;
    rightAnswersCount: number;
}
export interface RebusStatusResponse {
    result: boolean;
}

export interface ActivityState {
    tetrisLink: string | null;
    tetrisStatus: boolean | null;

    photoCheckStatus: 'claimed' | 'rejected' | null;
    photoCheckCompleted: boolean | null;

    quizReward: number | null;
    quizStatus: boolean | null;

    rewardRebus: number | null,
    rebusStatus: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}