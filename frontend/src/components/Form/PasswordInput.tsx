import { useState, useId } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
}

const PasswordInput = ({ label, value, onChange, error }: Props) => {
    const [show, setShow] = useState(false);
    const id = useId();

    return (
        <div className="mb-3 password-input-wrapper">
            <label className="form-label fw-semibold" htmlFor={id}>
                {label}
            </label>
            <div className="password-input-inner">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    className={`form-control pe-5 ${error ? "is-invalid shake" : ""}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter password"
                />
                <button
                    type="button"
                    className={`password-toggle-btn ${error ? "has-error" : ""}`}
                    onClick={() => setShow(!show)}
                    tabIndex={-1}
                >
                    {show ? <FiEye /> : <FiEyeOff />}
                </button>
            </div>
            {error && <small className="text-danger">{error}</small>}
        </div>
    );
};

export default PasswordInput;
