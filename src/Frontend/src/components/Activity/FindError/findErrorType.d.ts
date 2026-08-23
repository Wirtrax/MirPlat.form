export interface FindErrorRulesProps {
    onStartGame: () => void;
}

export interface FindErrorGameProps {
    onEndGame: (coins: number) => void;
}

export interface FindErrorSuccessProps {
    coins: number;
}