import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextInput from "../components/Form/TextInput";
import PasswordInput from "../components/Form/PasswordInput";
import { loginAPI } from "../apis/authApi";
import Loader from "../components/Loader/Loader";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../components/Toast/Toast";
import { isValidEmail } from "../utils/validators";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const { pushToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const err: any = {};

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail) {
            err.email = "Email is required";
        } else if (!isValidEmail(trimmedEmail)) {
            err.email = "Enter a valid email address";
        }

        if (!trimmedPassword) {
            err.password = "Password is required";
        } else if (trimmedPassword.length < 8) {
            err.password = "Password must be 8 characters or more";
        } else if (!/[a-z]/.test(trimmedPassword) || !/[A-Z]/.test(trimmedPassword) || !/\d/.test(trimmedPassword)) {
            err.password = "Password must contain upper, lower, and a digit";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleEmailChange = (v: string) => {
        setEmail(v);
        if (errors.email) {
            setErrors((prev: any) => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (v: string) => {
        setPassword(v);
        if (errors.password) {
            setErrors((prev: any) => ({ ...prev, password: undefined }));
        }
    };

    const submit = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await loginAPI(email, password);
            if (res.token) {
                login(res.token);
                pushToast("Login successful! Redirecting...", "success");
                navigate("/threads");
            } else {
                pushToast(res.msg || "Login failed", "error");
            }
        } catch {
            pushToast("Server error", "error");
        }
        setLoading(false);
    };

    const handleKey = (e: any) => {
        if (e.key === "Enter" || (e.ctrlKey && e.key === "Enter")) submit();
    };

    return (
        <div className="container col-md-4 mt-5">
            <h2 className="text-center fw-bold mb-4">Login</h2>

            <TextInput
                label="Email"
                value={email}
                onChange={handleEmailChange}
                autoFocus
                error={errors.email}
                placeholder="Enter email"
            />

            <PasswordInput
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={errors.password}
            />

            <button className="btn btn-primary w-100 mt-3"
                onClick={submit}
                disabled={loading}
                onKeyDown={handleKey}>
                {loading ? <Loader /> : "Login"}
            </button>

            <p className="text-center mt-3">
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
