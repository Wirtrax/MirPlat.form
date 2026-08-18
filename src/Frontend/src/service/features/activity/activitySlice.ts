import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ActivityState } from "./activitySliceType";
import { completeQuiz, getQuizResult, getTetrisLink, sendPhotoCheck, sendTetrisPhoto } from "../../api";


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

export const submitPhotoCheck = createAsyncThunk(
    'activity/submitPhotoCheck',
    async (flag: boolean) => {
        return await sendPhotoCheck(flag)
    }
);

export const fetchCompleteQuiz = createAsyncThunk(
    'activity/fetchCompleteQuiz',
    async (flag: boolean) => {
        return await completeQuiz(flag);
    }
);

export const fetchQuizResult = createAsyncThunk(
    'activity/fetchQuizResult',
    async () => {
        return await getQuizResult();
    }
);

const initialState: ActivityState = {
    tetrisLink: null,
    photoCheckStatus: null,
    quizResult: null,
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

            // фото-чек
            .addCase(submitPhotoCheck.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(submitPhotoCheck.fulfilled, (state, action) => {
                state.status = 'success';
                state.photoCheckStatus = action.payload.status;
            })
            .addCase(submitPhotoCheck.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось проверить фото';
            })

            //награда за квиз
            .addCase(fetchCompleteQuiz.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCompleteQuiz.fulfilled, (state, action) => {
                state.status = 'success';
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
                state.quizResult = action.payload.result;
            })
            .addCase(fetchQuizResult.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Не удалось получить статус квиза';
            })
    }
})

export default activitySlice.reducer;
