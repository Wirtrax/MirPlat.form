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

export interface QuizSubmitResponse {
    reward: number;
}

export interface QuizResultResponse {
    result: boolean;
}

export interface ActivityState {
    tetrisLink: string | null;
    tetrisStatus: boolean | null;

    photoCheckStatus: 'claimed' | 'rejected' | null;
    photoCheckCompleted: boolean | null;

    quizReward: number | null;
    quizResult: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}