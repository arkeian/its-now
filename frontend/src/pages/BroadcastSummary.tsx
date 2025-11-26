import { useContext, useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { getBroadcastsAPI, voteBroadcastAPI, deleteBroadcastAPI } from "../apis/broadcastsApi";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import BookmarkButton from "../components/BookmarkButton/BookmarkButton";
import Skeleton from "../components/Skeleton/Skeleton";
import GoTopButton from "../components/GoToTopButton/GoToTopButton";
import UserIcon from "../components/UserIcon/UserIcon";
import { AuthContext } from "../contexts/AuthContext";
import { FiTrash2, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import VideoEmbed from "../components/Upload/VideoEmbed";
import { useToast } from "../components/Toast/Toast";

const BroadcastPage = () => {
    useRequireLogin();
    const { user } = useContext(AuthContext);
    const { pushToast } = useToast();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        const data = await getBroadcastsAPI();
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, []);

    const vote = async (id: string, type?: "up" | "down") => {
        const updated = await voteBroadcastAPI(id, type);
        setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">Broadcast Announcements</h3>

            {loading ? (
                [...Array(5)].map((_, idx) => <Skeleton key={idx} height={150} />)
            ) : (
                posts.map((post) => {
                    const ownerId =
                        post.user && typeof post.user === "object" ? post.user._id : post.user;
                    const isOwner =
                        !!user && (user._id === ownerId || (user as any).id === ownerId);

                    return (
                        <article className="card p-3 mb-3 shadow-sm border-0 thread-card" key={post._id}>
                            <div className="d-flex align-items-center gap-2 mb-1 small thread-meta position-relative">
                                <UserIcon user={post.user} small />
                                <Link
                                    to={`/user/${post.user._id}`}
                                    className="fw-semibold text-decoration-none thread-username-link"
                                >
                                    {post.user.username}
                                </Link>
                                <span className="thread-date">
                                    · {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <Link to={`/broadcast/${post._id}`} className="text-decoration-none thread-card-link">
                                <h2 className="h6 fw-bold mb-2 thread-title">{post.title}</h2>
                                <p className="mb-2">{post.body}</p>
                            </Link>

                            {post.video && <VideoEmbed url={post.video} />}

                            <div className="thread-card-actions d-flex align-items-center gap-3 mt-2 small">
                                <VoteButtons
                                    id={post._id}
                                    upvotes={post.upvotes}
                                    downvotes={post.downvotes}
                                    onVote={vote}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-link d-flex align-items-center gap-1 px-0"
                                >
                                    <FiMessageCircle />
                                    <span>{post.commentsCount ?? 0}</span>
                                </button>
                                <BookmarkButton id={post._id} />
                                {isOwner && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 ms-auto"
                                        onClick={() => setDeleteId(post._id)}
                                    >
                                        <FiTrash2 />
                                        <span>Delete</span>
                                    </button>
                                )}
                            </div>
                        </article>
                    );
                })
            )}

            <GoTopButton />

            <Modal
                isOpen={!!deleteId}
                title="Delete this broadcast?"
                confirmLabel="Delete broadcast"
                cancelLabel="Cancel"
                isDestructive
                onCancel={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (!deleteId) return;
                    await deleteBroadcastAPI(deleteId);
                    setPosts((prev) => prev.filter((p) => p._id !== deleteId));
                    pushToast("Broadcast deleted", "success");
                    setDeleteId(null);
                }}
            >
                This announcement will be permanently removed.
            </Modal>
        </div>
    );
};

export default BroadcastPage;
