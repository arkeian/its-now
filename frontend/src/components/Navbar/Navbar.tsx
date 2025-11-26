import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { FiSun, FiMoon, FiUser, FiLogOut, FiPlus } from "react-icons/fi";
import Modal from "../Modal/Modal";

const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [confirmLogout, setConfirmLogout] = useState(false);

    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/";

    return (
        <nav className="navbar navbar-expand-lg border-bottom px-3 sticky-top app-navbar">
            <Link className="navbar-brand fw-bold" to="/">
                ITS Now
            </Link>

            <div className="ms-auto d-flex align-items-center gap-3">

                {token && !isAuthPage ? (
                    <>
                        <Link to="/create-thread" className="btn btn-primary d-none d-md-inline-flex align-items-center gap-1">
                            <FiPlus />
                            <span className="d-none d-lg-inline">New thread</span>
                        </Link>

                        <Link to="/bookmarks" className="btn btn-outline-secondary">
                            Bookmarks
                        </Link>

                        <Link to="/edit-profile" className="btn btn-outline-secondary">
                            <FiUser />
                        </Link>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            {theme === "light" ? <FiMoon /> : <FiSun />}
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => setConfirmLogout(true)}
                        >
                            <FiLogOut />
                        </button>
                    </>
                ) : (
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "light" ? <FiMoon /> : <FiSun />}
                    </button>
                )}
            </div>

            <Modal
                isOpen={confirmLogout}
                title="Log out?"
                confirmLabel="Log out"
                cancelLabel="Stay logged in"
                isDestructive
                onCancel={() => setConfirmLogout(false)}
                onConfirm={() => {
                    logout();
                    navigate("/login");
                    setConfirmLogout(false);
                }}
            >
                You will need to log in again to access your bookmarks and personalized content.
            </Modal>
        </nav>
    );
};

export default Navbar;
