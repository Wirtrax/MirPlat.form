import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ActivityState, FindErrorAnswer, QuizAnswer, RebusAnswer } from "./activitySliceType";
import { getCardsGame, getCodeLines, getFindErrorStatus, getPhotoCheckStatus, getQuizResult, getRebusStatus, getTetrisLink, getTetrisStatus, getTetrisToast, sendPhotoCheck, sendTetrisPhoto, submiteQuiz, submitFindError, submitFourGame, submitRebus, submitRebusReward } from "../../activityApi";

// тетрис
export const fetchTetrisLink = createAsyncThunk(
    'activity/fetchTetrisLink',
    async () => {
        return await getTetrisLink()
    }
);

export const submitTetrisPhoto = createAsyncThunk(
    'activity/submitTetrisPhoto',
    async (file: File) => {
        return await sendTetrisPhoto(file)
    }
);

export const fetchTetrisStatus = createAsyncThunk(
    'activity/fetchTetrisStatus',
    async () => {
        return await getTetrisStatus()
    }
)
export const fetchTetrisToast = createAsyncThunk(
    'activity/fetchTetrisToast',
    async () => {
        return await getTetrisToast()
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
    async ({ questionId, answer }: RebusAnswer) => {
        return await submitRebus(questionId, answer);
    }
);

export const fetchRebusStatus = createAsyncThunk(
    'activity/fetchRebusStatus',
    async () => {
        return await getRebusStatus();
    }
);

export const fetchRebusReward = createAsyncThunk(
    'activity/fetchRebusReward',
    async (countOfRightAnswers: number) => {
        await submitRebusReward(countOfRightAnswers);
        return countOfRightAnswers;
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

//найти ошибку
export const fetchSubmitFindError = createAsyncThunk(
    'activity/fetchSubmitFindError',
    async (answers: FindErrorAnswer[]) => {
        return await submitFindError(answers);
    }
);

export const fetchGetCodeLines = createAsyncThunk(
    'activity/fetchGetCodeLines',
    async () => {
        return await getCodeLines();
    }
)

export const fetchFindErrorStatus = createAsyncThunk(
    'activity/fetchFindErrorStatus',
    async () => {
        return await getFindErrorStatus();
    }
)


const initialState: ActivityState = {
    tetrisLink: null,
    tetrisStatus: null,
    isChangedTetrisToastStatus: null,
    currentToastStatus: null,
    rewardTetris: null,
    reason: null,

    photoCheckStatus: null,
    photoCheckCompleted: null,

    quizReward: null,
    quizStatus: null,

    rebusStatus: null,
    rebusResult: null,

    cardsGame: null,
    rewardFourGame: null,

    codeLines: null,
    correctAnswers: null,
    isComplited: null,
    rewardFindError: null,
    findErrorStatus: null,

    status: 'idle',
    error: null,
}

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        clearTetrisToast: (state) => {
            state.isChangedTetrisToastStatus = false;
        },
    },
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
            // получение инф-и о пуше тетриса
            .addCase(fetchTetrisToast.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTetrisToast.fulfilled, (state, action) => {
                state.status = 'success';
                state.isChangedTetrisToastStatus = action.payload.isChanged;
                state.currentToastStatus = action.payload.currentStatus
                state.rewardTetris = action.payload.reward
                state.reason = action.payload.reason
            })
            .addCase(fetchTetrisToast.rejected, (state, action) => {
                state.status = 'failed';
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

            //отправка ответа ребуса
            .addCase(fetchSubmitRebus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubmitRebus.fulfilled, (state, action) => {
                state.status = 'success';
                state.rebusResult = action.payload;
            })
            .addCase(fetchSubmitRebus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось проверить ответ на ребус';
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

            //отправка награды
            .addCase(fetchRebusReward.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchRebusReward.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(fetchRebusReward.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось начислить награду за ребус';
            })

            //4x4 получение карточек
            .addCase(fetchCardGame.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCardGame.fulfilled, (state, action) => {
                state.status = 'success';
                state.cardsGame = action.payload;
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

            //найти ошибку отправка ответов
            .addCase(fetchSubmitFindError.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSubmitFindError.fulfilled, (state, action) => {
                state.status = 'success';
                state.correctAnswers = action.payload.correct_answers;
                state.rewardFindError = action.payload.reward;
                state.isComplited = action.payload.isComplited;
            })
            .addCase(fetchSubmitFindError.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить награду';
            })
            //найти ошибку получить массив строк
            .addCase(fetchGetCodeLines.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGetCodeLines.fulfilled, (state, action) => {
                state.status = 'success';
                state.codeLines = action.payload;
            })
            .addCase(fetchGetCodeLines.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить массив';
            })
            //найти ошибку получить статус
            .addCase(fetchFindErrorStatus.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFindErrorStatus.fulfilled, (state, action) => {
                state.status = 'success';
                state.findErrorStatus = action.payload.result;
            })
            .addCase(fetchFindErrorStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус';
            })
    }
})

export const { clearTetrisToast } = activitySlice.actions
export default activitySlice.reducer;
