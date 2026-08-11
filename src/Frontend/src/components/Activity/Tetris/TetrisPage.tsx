import Tetris from './Tetris';
import TetrisSuccess from './TetrisSuccess';

export default function TetrisPage() {
    const attempts = [
        {
            is_photo: true,
        },
    ];

    const hasSubmittedPhoto = attempts.some(
        (attempt) => attempt.is_photo
    );

    if (hasSubmittedPhoto) {
        return <TetrisSuccess hasSubmittedPhoto={hasSubmittedPhoto} />;
    }

    return <Tetris />;
}