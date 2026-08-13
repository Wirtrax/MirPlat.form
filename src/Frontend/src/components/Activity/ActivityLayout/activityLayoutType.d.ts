 export interface ActivityProps {
    title?: string;
    children?: React.ReactNode;
     description?: string | React.ReactNode;
    timer?: React.ReactNode;
    buttonText?: string;
    buttonDisabled?: boolean;
    onButtonClick?: () => void;
}