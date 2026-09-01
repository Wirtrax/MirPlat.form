import s from './QrScanner.module.scss';

import { Html5Qrcode } from 'html5-qrcode';

import { useEffect, useRef } from 'react';


interface QrScannerProps {
    onClose?: () => void;
}

const QrScanner = ({ onClose }: QrScannerProps) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        const elementId = "qr-reader";
        const container = document.getElementById(elementId);

        if (container) {
            container.innerHTML = "";
        }

        const html5QrCode = new Html5Qrcode(elementId);
        scannerRef.current = html5QrCode;

        let isSubscribed = true;

        const startCamera = async () => {
            try {
                await html5QrCode.start(
                    { facingMode: 'environment' },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        console.log("Сканировано:", decodedText);
                    },
                    () => { }
                );

                if (!isSubscribed) {
                    await html5QrCode.stop();
                    html5QrCode.clear();
                }
            } catch (err) {
                if (isSubscribed) {
                    console.error("Ошибка запуска камеры:", err);
                }
            }
        };

        startCamera();

        return () => {
            isSubscribed = false;
            if (scannerRef.current) {
                if (scannerRef.current.isScanning) {
                    scannerRef.current.stop().then(() => {
                        scannerRef.current?.clear();
                    }).catch(console.error);
                } else {
                    try {
                        scannerRef.current.clear();
                    } catch (e) {
                    }
                }
            }
        };
    }, []);

    return (
        <div className={s.wrapper}>
            <div id="qr-reader" className={s.reader} />
        </div>
    );
};

export default QrScanner;