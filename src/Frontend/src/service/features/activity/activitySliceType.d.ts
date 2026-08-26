export interface TetrisLinkResponse {
    link: string;
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
    isReply: boolean;
    reward: number;
}

export interface RebusSubmitResponse {
    result: boolean;
}

export interface RebusAnswer {
    questionId: number;
    answer: string;
}

export interface RebusRewardRequest {
    countOfRightAnswers: number;
}

export interface RebusStatusResponse {
    result: boolean;
}


export interface CardGameGroup {
    id: number;
    icon: string;
    group_id: string;
}

export interface CardGameGroupsResponse {
    groups: CardGameGroup[];
}

export interface FourGameSubmitResponse {
    reward: number;
}


export interface FindErrorAnswer {
    id: number;
    indexInputLine: number;
}

export interface FindErrorSubmitResponse {
    correct_answers: number;
    reward: number;
    isComplited: boolean;
}

export interface FindErrorCode {
    id: number;
    difficulty: string;
    codeLines: string[];
}

export interface FindErrorStatus {
    result: boolean;
}

export interface ActivityState {
    tetrisLink: string | null;
    tetrisStatus: boolean | null;

    photoCheckStatus: 'claimed' | 'rejected' | null;
    photoCheckCompleted: boolean | null;

    quizReward: number | null;
    quizStatus: boolean | null;

    rebusStatus: boolean | null;
    rebusResult: boolean | null;
    rebusRightAnswers: number;

    rewardFourGame: number | null;
    cardsGame: CardGameGroup[] | null;

    codeLines: FindErrorArray[] | null;
    correctAnswers: number | null;
    isComplited: boolean | null;
    rewardFindError: number | null;
    findErrorStatus: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}