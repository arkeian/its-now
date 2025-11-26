import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMessageCircle } from "react-icons/fi";
import VoteButtons from "../VoteButtons/VoteButtons";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import UserIcon from "../UserIcon/UserIcon";
import Modal from "../Modal/Modal";
import { deleteThreadAPI } from "../../apis/threadsApi";
import { useToast } from "../Toast/Toast";
import { buildThreadPreview } from "../../utils/threadPreview";
import { AuthContext } from "../../contexts/AuthContext";

interface Props {
    thread: any;
    onVote: (id: string, type?: "up" | "down") => void;
}

const ThreadCard = ({ thread, onVote }: Props) => {
    const { pushToast } = useToast();
    const { user } = useContext(AuthContext);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const commentCount = thread.commentsCount ?? 0;

    const preview = buildThreadPreview(thread.body || "");

    if (!thread.user) {
        return null;
    }

    return (
        <article className="card p-3 mb-3 shadow-sm border-0 thread-card">
            <div className="thread-card-main position-relative">
                <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1 small thread-meta">
                        <UserIcon user={thread.user} small />
                        <Link to={`/user/${thread.user._id}`} className="fw-semibold text-decoration-none thread-username-link">
                            {thread.user.username}
                        </Link>
                        <span className="thread-date">· {new Date(thread.createdAt).toLocaleDateString()}</span>
                        {thread.tags?.length > 0 && (
                            <div className="d-flex gap-1 flex-wrap ms-2">
                                {thread.tags.map((tag: string) => (
                                    <span key={tag} className="badge bg-primary bg-opacity-75">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to={`/thread/${thread._id}`} className="text-decoration-none thread-card-link">
                        <h2 className="h6 fw-bold mb-2 thread-title">{thread.title}</h2>
                        <div
                            className="thread-body-preview mb-2"
                            dangerouslySetInnerHTML={{ __html: preview.html }}
                        />
                    </Link>
                </div>
            </div>
            <div className="thread-card-actions d-flex align-items-center gap-3 mt-2 small">
                <VoteButtons
                    id={thread._id}
                    upvotes={thread.upvotes}
                    downvotes={thread.downvotes}
                    onVote={onVote}
                />
                <button type="button" className="btn btn-sm btn-link d-flex align-items-center gap-1 px-0">
                    <FiMessageCircle />
                    <span>{commentCount}</span>
                </button>
                <BookmarkButton id={thread._id} />
                {user && thread.user && (user.id === thread.user._id || user._id === thread.user._id) && (
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger ms-auto"
                        onClick={() => setConfirmDelete(true)}
                    >
                        Delete
                    </button>
                )}
            </div>
            <Modal
                isOpen={confirmDelete}
                title="Delete this thread?"
                confirmLabel="Delete thread"
                cancelLabel="Cancel"
                isDestructive
                onCancel={() => setConfirmDelete(false)}
                onConfirm={async () => {
                    await deleteThreadAPI(thread._id);
                    pushToast("Thread deleted", "success");
                    setConfirmDelete(false);
                }}
            >
                This action cannot be undone. All comments on this thread will also be removed.
            </Modal>
        </article>
    );
};

export default ThreadCard;
