import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
    id: string;
    upvotes: string[];
    downvotes: string[];
    onVote: (id: string, type?: "up" | "down") => void;
}

const VoteButtons = ({ id, upvotes, downvotes, onVote }: Props) => {
    const { user } = useContext(AuthContext);
    const myId = user?.id;

    const isUp = myId ? upvotes.includes(myId) : false;
    const isDown = myId ? downvotes.includes(myId) : false;

    return (
        <div className="d-flex align-items-center gap-2 vote-buttons">
            <button
                className={`btn btn-sm ${isUp ? "btn-primary" : "btn-light"}`}
                onClick={() => onVote(id, isUp ? undefined : "up")}
            >
                <FiArrowUp /> {upvotes.length}
            </button>
            <button
                className={`btn btn-sm ${isDown ? "btn-danger" : "btn-light"}`}
                onClick={() => onVote(id, isDown ? undefined : "down")}
            >
                <FiArrowDown /> {downvotes.length}
            </button>
        </div>
    );
};

export default VoteButtons;
