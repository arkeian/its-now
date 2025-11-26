import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const CreateThreadButton = () => (
    <Link
        to="/create-thread"
        className="btn btn-primary rounded-circle create-thread-btn"
        aria-label="Create thread"
    >
        <FiPlus />
    </Link>
);

export default CreateThreadButton;
