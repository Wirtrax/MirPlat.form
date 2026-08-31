import { useEffect } from 'react';
import { showToast } from '../utils/showToast';
import { getErrorMessage } from '../utils/getErrorMessage';

export function useActivityError(error: string | null) {
    useEffect(() => {
        if (error) {
            showToast(getErrorMessage(error));
        }
    }, [error]);
}
