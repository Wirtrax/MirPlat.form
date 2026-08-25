import type {
    TetrisLinkResponse,
    TetrisSubmitResponse,
    PhotoCheckSubmitResponse,
    PhotoCheckStatusResponse,
    TetrisStatusResponse,
    QuizSubmitResponse,
    QuizStatusResponse,
    RebusSubmitResponse,
    RebusStatusResponse,
    QuizAnswer,
    CardGameGroupsResponse,
    FourGameSubmitResponse,
} from './features/activity/activitySliceType';

import { request } from './utils/query';

//тетрис
export const getTetrisLink = () => {
    return request<TetrisLinkResponse>('/activities/tetris', {
        method: 'GET',
    });
};

export const sendTetrisPhoto = (photo_link: string) => {
    return request<TetrisSubmitResponse>('/activities/tetris', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo_link }),
    });
};

export const getTetrisStatus = () => {
    return request<TetrisStatusResponse>('/activities/tetris_status', {
        method: 'GET',
    })
}

//фоточек
export const sendPhotoCheck = (flag: boolean) => {
    return request<PhotoCheckSubmitResponse>('/activities/photo_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flag }),
    });
};

export const getPhotoCheckStatus = () => {
    return request<PhotoCheckStatusResponse>(
        '/activities/photo_check_status',
        {
            method: 'GET',
        }
    );
};

//квиз
export const submiteQuiz = (answers: QuizAnswer[]) => {
    return request<QuizSubmitResponse>('/activities/quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
    });
};

export const getQuizResult = () => {
    return request<QuizStatusResponse>('/activities/quiz_status', {
        method: 'GET',
    });
}

//ребус
export const submitRebus = (questionId: number, answer: string) => {
    return request<RebusSubmitResponse>('/activities/it_rebus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, answer }),
    });
};

export const submitRebusReward = (countOfRightAnswers: number) => {
    return request('/activities/it_rebus/reward', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            countOfRightAnswers,
        }),
    });
};

export const getRebusStatus = () => {
    return request<RebusStatusResponse>('/activities/it_rebus_status', {
        method: 'GET',
    });
}

// 4x4
export const getCardsGame = () => {
    return request<CardGameGroupsResponse>('/activities/card_game_4x4',
        {
            method: 'GET',
        }
    )
}

export const submitFourGame = (count_of_guesed_group: number) => {
    return request<FourGameSubmitResponse>('/activities/card_game_4x4',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({count_of_guesed_group})
        }
    )
}
