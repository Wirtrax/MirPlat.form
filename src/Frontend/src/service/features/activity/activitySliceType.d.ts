export interface TetrisLinkResponse {
    link: string;
}

export interface TetrisStatusResponse {
    result: boolean;
}
export type TetrisStatusToast = 'WAITING' | 'ACCLAIMED' | 'DECLINED';

export interface TetrisToast {
    isChanged: boolean;
    currentStatus: TetrisStatusToast;
    reward: number;
    reason: string | null;
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

export type CardGameGroupsResponse = CardGameGroup[];

export interface FourGameSubmitResponse {
    reward: number;
}

export interface FourGameStatus {
    result: boolean;
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
    isChangedTetrisToastStatus: boolean | null;
    currentToastStatus: TetrisStatusToast | null;
    rewardTetris: number | null;
    reason: string | null;

    photoCheckStatus: 'claimed' | 'rejected' | null;
    photoCheckCompleted: boolean | null;

    quizReward: number | null;
    quizStatus: boolean | null;

    rebusStatus: boolean | null;
    rebusResult: boolean | null;

    rewardFourGame: number | null;
    cardsGame: CardGameGroup[] | null;
    fourGameStatus: boolean | null;
    fourGameStatusReward: number | null;

    codeLines: FindErrorCode[] | null;
    correctAnswers: number | null;
    isComplited: boolean | null;
    rewardFindError: number | null;
    findErrorStatus: boolean | null;

    status: 'idle' | 'loading' | 'success' | 'failed';

    error: string | null;
}