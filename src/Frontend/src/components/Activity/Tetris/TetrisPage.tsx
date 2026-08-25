import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';

import Tetris from './Tetris';
import TetrisSuccess from './TetrisSuccess';
import { fetchTetrisStatus, submitTetrisPhoto } from '../../../service/features/activity/activitySlice';


export default function TetrisPage() {
    const { tetrisStatus } = useAppSelector(state => state.activity)
    const dispatch = useAppDispatch()

    const [isJustSubmitted, setIsJustSubmitted] = useState(false);

    useEffect(() => {
        dispatch(fetchTetrisStatus())
    }, [])

    const handleSubmit = async (file: File) => {
        await dispatch(submitTetrisPhoto(file)).unwrap()
        setIsJustSubmitted(true)
    }

    if (tetrisStatus) {
        return <TetrisSuccess hasSubmittedPhoto={true} />;
    }
    if (isJustSubmitted) {
        return <TetrisSuccess hasSubmittedPhoto={false} />;
    }

    return <Tetris onSubmitPhoto={handleSubmit} />;
}