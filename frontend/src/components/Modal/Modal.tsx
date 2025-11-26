import type { ReactNode, KeyboardEvent, MouseEvent } from "react";
import { useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    isDestructive?: boolean;
    isProcessing?: boolean;
    onConfirm?: () => void;
    onCancel: () => void;
}

const Modal = ({
    isOpen,
    title,
    children,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    isDestructive,
    isProcessing,
    onConfirm,
    onCancel,
}: ModalProps) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const firstButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const timer = window.setTimeout(() => {
            firstButtonRef.current?.focus();
        }, 10);

        const handleKeyDown = (e: KeyboardEvent | KeyboardEventInit | any) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onCancel();
            }
        };

        window.addEventListener("keydown", handleKeyDown as any);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.clearTimeout(timer);
            window.removeEventListener("keydown", handleKeyDown as any);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab") {
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (!focusable || focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            } else if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        }
    };

    return (
        <div
            className="modal-backdrop-custom"
            role="presentation"
            onClick={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                className="modal-dialog-custom"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                onKeyDown={handleKeyDown}
            >
                {title && (
                    <h2 id="modal-title" className="h5 mb-3">
                        {title}
                    </h2>
                )}

                <div className="mb-3">{children}</div>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        ref={firstButtonRef}
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                        disabled={isProcessing}
                    >
                        {cancelLabel}
                    </button>
                    {onConfirm && (
                        <button
                            type="button"
                            className={`btn ${isDestructive ? "btn-danger" : "btn-primary"
                                }`}
                            onClick={onConfirm}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Please wait..." : confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
