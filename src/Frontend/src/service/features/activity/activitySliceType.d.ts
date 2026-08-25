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

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}