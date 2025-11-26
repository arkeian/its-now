import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollMemory = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const saved = sessionStorage.getItem(`scroll-${pathname}`);
        if (saved) {
            window.scrollTo(0, parseInt(saved));
        }

        const onScroll = () => {
            sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);
};
