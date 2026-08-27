import type { ItRebusType } from "../../../mock/itRebus";

export interface ITRebusStepProps {
    data: ItRebusType;
    onCheck: (answer: string) => Promise<boolean>;
    onNext: () => void;
}

export interface ITRebusSuccessProps {
    score: number;
    length: number;
    isAlreadyCompleted?: boolean;
}