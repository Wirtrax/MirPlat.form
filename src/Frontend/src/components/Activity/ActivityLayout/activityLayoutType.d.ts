export interface ActivityProps {
    title?: string;
    children?: React.ReactNode;
    description?: string;
    timer?: React.ReactNode;
    buttonText?: string;
    onButtonClick?: () => void;
}