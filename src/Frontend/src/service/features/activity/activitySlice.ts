import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ActivityState, QuizAnswer } from "./activitySliceType";
import { getCardsGame, getPhotoCheckStatus, getQuizResult, getRebusStatus, getTetrisLink, getTetrisStatus, sendPhotoCheck, sendTetrisPhoto, submiteQuiz, submitFourGame, submitRebus } from "../../activityApi";

// тетрис
export const fetchTetrisLink = createAsyncThunk(
    'activity/fetchTetrisLink',
    async () => {
        return await getTetrisLink()
    }
);

export const submitTetrisPhoto = createAsyncThunk(
    'activity/submitTetrisPhoto',
    async (photo_link: string) => {
        return await sendTetrisPhoto(photo_link)
    }
);

export const fetchTetrisStatus = createAsyncThunk(
    'activity/fetchTetrisStatus',
    async () => {
        return await getTetrisStatus()
    }
)

// фоточек
export const submitPhotoCheck = createAsyncThunk(
    'activity/submitPhotoCheck',
    async (flag: boolean) => {
        return await sendPhotoCheck(flag);
    }
);

export const fetchPhotoCheckStatus = createAsyncThunk(
    'activity/fetchPhotoCheckStatus',
    async () => {
        return await getPhotoCheckStatus();
    }
);

// квиз
export const fetchCompleteQuiz = createAsyncThunk(
    'activity/fetchCompleteQuiz',
    async (answers: QuizAnswer[]) => {
        return await submiteQuiz(answers);
    }
);

export const fetchQuizResult = createAsyncThunk(
    'activity/fetchQuizResult',
    async () => {
        return await getQuizResult();
    }
);

// ребус
export const fetchSubmitRebus = createAsyncThunk(
    'activity/fetchSubmitRebus',
    async (answers: string[]) => {
        return await submitRebus(answers);
    }
);

export const fetchRebusStatus = createAsyncThunk(
    'activity/fetchRebusStatus',
    async () => {
        return await getRebusStatus();
    }
);

// 4x4
export const fetchCardGame = createAsyncThunk(
    'activity/fetchCardGame',
    async () => {
        return await getCardsGame();
    }
)
export const fetchSubmitFourGame = createAsyncThunk(
    'activity/fetchSubmitFourGame',
    async (count_of_guesed_group: number) => {
        return await submitFourGame(count_of_guesed_group);
    }
)


const initialState: ActivityState = {
    tetrisLink: null,
    tetrisStatus: null,

    photoCheckStatus: null,
    photoCheckCompleted: null,

    quizReward: null,
    quizStatus: null,

    rewardRebus: null,
    rebusStatus: null,

    cardsGame: null,
    rewardFourGame: null,

    status: 'idle',
    error: null,
}

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // получение ссылки на тетрис
            .addCase(fetchTetrisLink.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTetrisLink.fulfilled, (state, action) => {
                state.status = 'success';
                state.tetrisLink = action.payload.link;
            })
            .addCase(fetchTetrisLink.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить ссылку на Тетрис';
            })

            // отправка фото тетрис
            .addCase(submitTetrisPhoto.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(submitTetrisPhoto.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(submitTetrisPhoto.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось отправить фото';
            })
            //получение статуса прохождения тетриса
            .addCase(fetchTetrisStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTetrisStatus.fulfilled, (state, action) => {
                state.status = 'success';
                state.tetrisStatus = action.payload.result
            })
            .addCase(fetchTetrisStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус';
            })

            // фоточек отправка флага
            .addCase(submitPhotoCheck.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(submitPhotoCheck.fulfilled, (state, action) => {
                state.status = 'success';
                state.photoCheckStatus = action.payload.status;
                state.photoCheckCompleted = true;
            })
            .addCase(submitPhotoCheck.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось проверить фото';
            })
            // фоточек получение статуса
            .addCase(fetchPhotoCheckStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPhotoCheckStatus.fulfilled, (state, action) => {
                state.status = 'success';
                state.photoCheckCompleted = action.payload.result;
            })
            .addCase(fetchPhotoCheckStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус Photo Check';
            })

            //награда за квиз
            .addCase(fetchCompleteQuiz.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCompleteQuiz.fulfilled, (state, action) => {
                state.status = 'success';
                state.quizReward = action.payload.reward
            })
            .addCase(fetchCompleteQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить награду';
            })

            //статус квиза
            .addCase(fetchQuizResult.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchQuizResult.fulfilled, (state, action) => {
                state.status = 'success';
                state.quizStatus = action.payload.isReply;
                state.quizReward = action.payload.reward
            })
            .addCase(fetchQuizResult.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус квиза';
            })

            //отправка ребуса и получение монет
            .addCase(fetchSubmitRebus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubmitRebus.fulfilled, (state, action) => {
                state.status = 'success';
                state.rewardRebus = action.payload.rightAnswersCount
            })
            .addCase(fetchSubmitRebus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить награду';
            })

            //получение статуса ребуса
            .addCase(fetchRebusStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRebusStatus.fulfilled, (state, action) => {
                state.status = 'success';
                state.rebusStatus = action.payload.result;
            })
            .addCase(fetchRebusStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус ребуса';
            })

            //4x4 получение карточек
            .addCase(fetchCardGame.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCardGame.fulfilled, (state, action) => {
                state.status = 'success';
                state.cardsGame = action.payload.groups;
            })
            .addCase(fetchCardGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить карточки для игры';
            })
            //4x4 получить награду
            .addCase(fetchSubmitFourGame.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubmitFourGame.fulfilled, (state, action) => {
                state.status = 'success';
                state.rewardFourGame = action.payload.reward;
            })
            .addCase(fetchSubmitFourGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить награду';
            })
    }
})

export default activitySlice.reducer;
