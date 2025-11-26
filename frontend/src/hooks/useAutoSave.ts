import { useCallback } from "react";

export const useAutoSave = (key: string) => {
    const saveDraft = useCallback(
        (text: string) => {
            localStorage.setItem(key, text);
        },
        [key]
    );

    const loadDraft = useCallback(() => {
        return localStorage.getItem(key) || "";
    }, [key]);

    const clearDraft = useCallback(() => {
        localStorage.removeItem(key);
    }, [key]);

    return { saveDraft, loadDraft, clearDraft };
};
