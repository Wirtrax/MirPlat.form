import type { ItRebusType } from "../../../mock/itRebus";

export interface ITRebusStepProps {
    data: ItRebusType;
    onNext: (isCorrect: boolean) => void;
}

export interface ITRebusSuccessProps{
    score: number;
    length: number;
    isAlreadyCompleted?: boolean;
}