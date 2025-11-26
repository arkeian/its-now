import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextInput from "../components/Form/TextInput";
import PasswordInput from "../components/Form/PasswordInput";
import { registerAPI } from "../apis/authApi";
import Loader from "../components/Loader/Loader";
import { useToast } from "../components/Toast/useToast";
import { isValidEmail } from "../utils/validators";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { pushToast } = useToast();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const err: any = {};

        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername) {
            err.username = "Username is required";
        } else if (trimmedUsername.length > 32) {
            err.username = "Username must be at most 32 characters";
        }

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

    const handleUsernameChange = (v: string) => {
        setUsername(v);
        if (errors.username) {
            setErrors((prev: any) => ({ ...prev, username: undefined }));
        }
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
        const res = await registerAPI(username, email, password);

        if (res.token) {
            pushToast("Registration complete! Please log in.", "success");
            navigate("/login");
        } else if (res.msg === "Username and email already used") {
            pushToast("Username and email already used", "error");
        } else if (res.msg === "Username already used") {
            pushToast("Username already used", "error");
        } else if (res.msg === "Email already used") {
            pushToast("Email already used", "error");
        } else {
            pushToast(res.msg || "Error registering", "error");
        }
        setLoading(false);
    };

    return (
        <div className="container col-md-4 mt-5">
            <h2 className="text-center fw-bold mb-4">Register</h2>

            <TextInput
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                error={errors.username}
                autoFocus
                placeholder="Enter username"
            />
            <TextInput
                label="Email"
                value={email}
                onChange={handleEmailChange}
                error={errors.email}
                placeholder="Enter email"
            />
            <PasswordInput
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                error={errors.password}
            />

            <button className="btn btn-primary w-100 mt-3" onClick={submit} disabled={loading}>
                {loading ? <Loader /> : "Register"}
            </button>

            <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
