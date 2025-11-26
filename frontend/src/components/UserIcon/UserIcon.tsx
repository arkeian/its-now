import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const UserIcon = ({ user, small }: { user: any; small?: boolean }) => {
    return (
        <Link to={`/user/${user._id}`} className="text-decoration-none">
            {user.image ? (
                <img
                    src={user.image}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: small ? 28 : 40, height: small ? 28 : 40, objectFit: "cover" }}
                />
            ) : (
                <div
                    className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white"
                    style={{ width: small ? 28 : 40, height: small ? 28 : 40 }}
                >
                    <FiUser />
                </div>
            )}
        </Link>
    );
};

export default UserIcon;
