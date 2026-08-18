export interface TetrisLinkResponse {
    link: string;
}

export interface TetrisSubmitResponse {
    message: string;
}

export interface PhotoCheckResponse {
    message: string;
    status: 'claimed' | 'rejected';
}

export interface QuizSubmitRequest {
    flag: boolean;
}

export interface QuizResultResponse {
    result: boolean;
}

export interface ActivityState {
    tetrisLink: string | null;

    photoCheckStatus: 'claimed' | 'rejected' | null;

    quizResult: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}