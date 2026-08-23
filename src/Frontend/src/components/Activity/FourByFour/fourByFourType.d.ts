import type { CardGameGroup } from "../../../service/features/activity/activitySliceType";

export interface FourByFourRulesProps {
    onStartGame: () => void;
}

export interface FourByFourGameProps {
    cards: CardGameGroup[] | null;
    onEndGame: (coins: number) => void;
}

export interface FourByFourSuccessProps {
    coins: number | null;
}

export interface GameCard extends CardGameGroup {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
