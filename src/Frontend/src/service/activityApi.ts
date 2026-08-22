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
export const submitRebus = (answers: string[]) => {
  return request<RebusSubmitResponse>('/activities/it_rebus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
};

export const getRebusStatus = () => {
  return request<RebusStatusResponse>('/activities/it_rebus_status', {
    method: 'GET',
  });
}