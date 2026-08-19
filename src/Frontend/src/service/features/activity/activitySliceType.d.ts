export interface TetrisLinkResponse {
    link: string;
}

export interface TetrisSubmitResponse {
    message: string;
}

export interface PhotoCheckSubmitResponse {
    message: string;
    status: 'claimed' | 'rejected';
}

export interface PhotoCheckStatusResponse {
    result: boolean;
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
    photoCheckCompleted: boolean | null;

    quizResult: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}