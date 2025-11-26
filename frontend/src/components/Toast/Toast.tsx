import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<any[]>([]);

    const pushToast = (message: string, type: "success" | "error" = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
    };

    return (
        <ToastContext.Provider value={{ pushToast }}>
            {children}
            <div className="toast-container-custom">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast-custom toast-${t.type}`}>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
