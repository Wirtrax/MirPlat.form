import { useState } from "react";
import PhotoBoothSuccess from "./PhotoBoothSuccess";
import PhotoBooth from "./PhotoBooth";

export default function PhotoBoothPage() {
    const [hasSubmittedPhoto] = useState(true); //вручную для повторного захода
    // const hasSubmittedPhoto = attempts.some(
    //     attempt => attempt.is_photo
    // );
    const [isJustSubmitted, setIsJustSubmitted] = useState(false)

    const handleSubmit = () => {
        //отправка на бэк
        setIsJustSubmitted(true)
    }

    if (hasSubmittedPhoto) return <PhotoBoothSuccess hasSubmittedPhoto={true} />
    if (isJustSubmitted) return <PhotoBoothSuccess hasSubmittedPhoto={false} />

    return <PhotoBooth onSubmitPhoto={handleSubmit} />
}
