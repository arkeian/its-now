import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import { AuthContext } from "../contexts/AuthContext";
import { deleteSelfAPI } from "../apis/usersApi";
import { useToast } from "../components/Toast/useToast";

const UserProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, logout } = useContext(AuthContext);
    const { pushToast } = useToast();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [password, setPassword] = useState("");
    const [deleting, setDeleting] = useState(false);

    const load = async () => {
        const res = await fetch(`http://localhost:8080/api/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setUser(data);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="container mt-4 text-center">
            <img
                src={user.image || "https://via.placeholder.com/160"}
                className="rounded-circle mb-3"
                alt="avatar"
                style={{ width: 150, height: 150, objectFit: "cover" }}
            />

            <h3 className="fw-bold">{user.username}</h3>

            {user.badge && (
                <span className="badge bg-primary text-white mb-2">{user.badge}</span>
            )}

            <p className="text-muted">{user.email}</p>

            <p className="mt-3">
                {user.description || <span className="text-muted">No description.</span>}
            </p>

            {currentUser && currentUser.id === user._id && (
                <div className="mt-4">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete my account
                    </button>
                </div>
            )}

            <Modal
                isOpen={showDelete}
                title="Delete your account?"
                confirmLabel="Delete account"
                cancelLabel="Cancel"
                isDestructive
                isProcessing={deleting}
                onCancel={() => setShowDelete(false)}
                onConfirm={async () => {
                    if (!password) {
                        pushToast("Please enter your password.", "error");
                        return;
                    }
                    setDeleting(true);
                    const res = await deleteSelfAPI(password);
                    if (res.msg === "Account deleted") {
                        pushToast("Account deleted", "success");
                        logout();
                        navigate("/login");
                    } else {
                        pushToast(res.msg || "Failed to delete account", "error");
                    }
                    setDeleting(false);
                }}
            >
                <p className="mb-2 text-danger fw-semibold">
                    This will permanently delete your account and all associated content.
                </p>
                <label className="form-label">Confirm your password to continue</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
            </Modal>
        </div>
    );
};

export default UserProfilePage;
