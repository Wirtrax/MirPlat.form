export interface TimerProps {
    duration?: number;
    danger?: number;
    staticTime?: string;
    classNameMargin?: string;
    onFinish?: () => void;
}