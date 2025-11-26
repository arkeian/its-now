import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const GoTopButton = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = () => setShow(window.scrollY > 600);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (!show) return null;
    return (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="position-fixed bottom-0 start-50 translate-middle-x btn btn-primary rounded-circle p-2">
            <FiArrowUp size={22} />
        </button>
    );
};

export default GoTopButton;
