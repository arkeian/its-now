import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <button
            className="back-button"
            onClick={handleBack}
            type="button"
            aria-label="Go back"
        >
            <FiArrowLeft />
        </button>
    );
};

export default BackButton;
