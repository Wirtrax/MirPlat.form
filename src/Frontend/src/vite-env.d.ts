/// <reference types="vite/client" />

declare module '*.svg?react' {
    import * as React from 'react'

    const ReactComponent: React.FC<
        React.SVGProps<SVGSVGElement>
    >

    export default ReactComponent
}

interface Window {
    Telegram: {
        WebApp?: {
            initData: string;
            initDataUnsafe?: Record<string, unknown>;
            ready: () => void;
            expand: () => void;
        }
    }
}