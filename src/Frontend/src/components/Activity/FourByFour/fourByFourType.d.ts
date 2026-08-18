export interface FourByFourRulesProps {
    onStartGame: () => void;
}

export interface FourByFourGameProps {
    onEndGame: (coins: number) => void;
}

export interface FourByFourSuccessProps{
    coins: number;
}