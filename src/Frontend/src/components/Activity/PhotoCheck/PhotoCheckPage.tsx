import { useEffect, useState } from "react";
import PhotoCheckSuccess from "./PhotoCheckSuccess";
import PhotoCheck from "./PhotoCheck";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchPhotoCheckStatus, submitPhotoCheck } from "../../../service/features/activity/activitySlice";
import Loader from "../../UI/Loader/Loader";


export default function PhotoCheckPage() {
    const dispatch = useAppDispatch()
    const { photoCheckCompleted } = useAppSelector(state => state.activity)

    useEffect(() => {
        dispatch(fetchPhotoCheckStatus())
    }, [dispatch])

    const [isJustSubmitted, setIsJustSubmitted] = useState(false)

    const handleSubmit = async () => {
        const result = await dispatch(submitPhotoCheck(true))

        if (submitPhotoCheck.fulfilled.match(result)) {
            setIsJustSubmitted(true);
        }
    }

    if (photoCheckCompleted === null) return <Loader />

    if (isJustSubmitted) return <PhotoCheckSuccess hasSubmittedPhoto={false} />

    if (photoCheckCompleted) return <PhotoCheckSuccess hasSubmittedPhoto={true} />


    return <PhotoCheck onSubmitPhoto={handleSubmit} />
}
