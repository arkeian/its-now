import { useId } from "react";

interface Props {
    label: string;
    value: string;
    placeholder?: string;
    type?: string;
    onChange: (v: string) => void;
    error?: string;
    autoFocus?: boolean;
}

const TextInput = ({ label, value, onChange, error, placeholder, type = "text", autoFocus }: Props) => {
    const id = useId();

    return (
        <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                autoFocus={autoFocus}
                type={type}
                className={`form-control ${error ? "is-invalid shake" : ""}`}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <small className="text-danger">{error}</small>}
        </div>
    );
};

export default TextInput;
