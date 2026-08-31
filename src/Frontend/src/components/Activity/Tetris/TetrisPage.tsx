import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';

import Tetris from './Tetris';
import TetrisSuccess from './TetrisSuccess';
import { fetchTetrisStatus, submitTetrisPhoto } from '../../../service/features/activity/activitySlice';

import Background from '../../UI/Background/Background';
import Loader from '../../UI/Loader/Loader';
import { useActivityError } from '../../../hooks/useActivityError';


export default function TetrisPage() {
    const { tetrisStatus, error } = useAppSelector(state => state.activity)
    const dispatch = useAppDispatch()

    const [isJustSubmitted, setIsJustSubmitted] = useState(false);

    useEffect(() => {
        dispatch(fetchTetrisStatus())
    }, [])

    useActivityError(error)

    const handleSubmit = async (file: File) => {
        await dispatch(submitTetrisPhoto(file)).unwrap()
        setIsJustSubmitted(true)
    }

    if (tetrisStatus === null) return <Background><Loader /></Background>


    if (tetrisStatus) {
        return <TetrisSuccess hasSubmittedPhoto={true} />;
    }
    if (isJustSubmitted) {
        return <TetrisSuccess hasSubmittedPhoto={false} />;
    }

    return <Tetris onSubmitPhoto={handleSubmit} />;
}