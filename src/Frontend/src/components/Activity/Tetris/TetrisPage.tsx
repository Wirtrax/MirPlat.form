import { useState } from 'react';

import Tetris from './Tetris';
import TetrisSuccess from './TetrisSuccess';

export default function TetrisPage() {
    const [hasSubmittedPhoto] = useState(false); //вручную для повторного захода
    // const hasSubmittedPhoto = attempts.some(
    //     attempt => attempt.is_photo
    // );
    const [isJustSubmitted, setIsJustSubmitted] = useState(false);

    const handleSubmit = () => {
        //отправка фото на бэк
        setIsJustSubmitted(true);
    }

    if (hasSubmittedPhoto) {
        return <TetrisSuccess hasSubmittedPhoto={true} />;
    }
    if (isJustSubmitted) {
        return <TetrisSuccess hasSubmittedPhoto={false} />;
    }

    return <Tetris onSubmitPhoto={handleSubmit} />;
}