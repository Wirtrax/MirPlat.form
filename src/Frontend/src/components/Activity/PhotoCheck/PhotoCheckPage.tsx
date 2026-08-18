import { useState } from "react";
import PhotoCheckSuccess from "./PhotoCheckSuccess";
import PhotoCheck from "./PhotoCheck";

const PHOTO_CHECK_KEY = 'photoCheckSubmitted';

export default function PhotoCheckPage() {
    const [hasSubmittedPhoto] = useState(
        () => localStorage.getItem(PHOTO_CHECK_KEY) === 'true'
    )
    const [isJustSubmitted, setIsJustSubmitted] = useState(false)

    const handleSubmit = () => {
       localStorage.setItem(PHOTO_CHECK_KEY, 'true')
        setIsJustSubmitted(true)
    }

    if (hasSubmittedPhoto) return <PhotoCheckSuccess hasSubmittedPhoto={true} />
    if (isJustSubmitted) return <PhotoCheckSuccess hasSubmittedPhoto={false} />

    return <PhotoCheck onSubmitPhoto={handleSubmit} />
}
