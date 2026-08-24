import type { ItRebusType } from "../../../mock/itRebus";

export interface ITRebusStepProps {
    data: ItRebusType;
    onNext: (answer: string) => void;
}

export interface ITRebusSuccessProps{
    score: number;
    length: number;
    isAlreadyCompleted?: boolean;
}