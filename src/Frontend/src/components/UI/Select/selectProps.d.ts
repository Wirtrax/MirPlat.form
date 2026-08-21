export interface Option {
    value: string;
    label: string;
}

export interface SelectProps {
    label?: string;
    error?: string;
    name: string;
    value: string;
    options: Option[];

    onChange: (e: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
}