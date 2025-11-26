import { useEffect } from "react";

export const useHotkeys = (map: Record<string, () => void>) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            if (map[key]) map[key]();

            if (e.ctrlKey && key === "k") {
                e.preventDefault();
                const search = document.querySelector("input[type='text']");
                if (search) (search as HTMLInputElement).focus();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [map]);
};
