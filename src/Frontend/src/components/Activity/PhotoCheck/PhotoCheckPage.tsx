import { useState } from "react";
import PhotoCheckSuccess from "./PhotoCheckSuccess";
import PhotoCheck from "./PhotoCheck";

export default function PhotoCheckPage() {
    const [hasSubmittedPhoto] = useState(true); //вручную для повторного захода
    // const hasSubmittedPhoto = attempts.some(
    //     attempt => attempt.is_photo
    // );
    const [isJustSubmitted, setIsJustSubmitted] = useState(false)

    const handleSubmit = () => {
        //отправка на бэк
        setIsJustSubmitted(true)
    }

    if (hasSubmittedPhoto) return <PhotoCheckSuccess hasSubmittedPhoto={true} />
    if (isJustSubmitted) return <PhotoCheckSuccess hasSubmittedPhoto={false} />

    return <PhotoCheck onSubmitPhoto={handleSubmit} />
}
