import { useContext, useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { getBroadcastsAPI, voteBroadcastAPI, deleteBroadcastAPI } from "../apis/broadcastsApi";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import Skeleton from "../components/Skeleton/Skeleton";
import GoTopButton from "../components/GoToTopButton/GoToTopButton";
import UserIcon from "../components/UserIcon/UserIcon";
import { AuthContext } from "../contexts/AuthContext";
import { FiMoreHorizontal } from "react-icons/fi";
import Modal from "../components/Modal/Modal";
import VideoEmbed from "../components/Upload/VideoEmbed";
import { useToast } from "../components/Toast/useToast";

const BroadcastPage = () => {
    useRequireLogin();
    const { user } = useContext(AuthContext);
    const { pushToast } = useToast();

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
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

    const vote = async (id: string, type: "up" | "down") => {
        const updated = await voteBroadcastAPI(id, type);
        setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">Broadcast Announcements</h3>

            {loading ? (
                [...Array(5)].map((_, idx) => <Skeleton key={idx} height={150} />)
            ) : (
                posts.map((post) => (
                    <div className="card p-3 mb-3 shadow-sm border-0" key={post._id}>
                        <div className="d-flex align-items-center gap-2 mb-2 position-relative">
                            <UserIcon user={post.user} small />
                            <span className="fw-semibold">{post.user.username}</span>
                            <span className="text-muted">
                                · {new Date(post.createdAt).toLocaleDateString()}
                            </span>

                            <button
                                type="button"
                                className="btn btn-sm btn-link position-absolute end-0 top-0 text-muted"
                                onClick={() => setMenuOpenId(menuOpenId === post._id ? null : post._id)}
                                aria-label="More actions"
                            >
                                <FiMoreHorizontal />
                            </button>

                            {menuOpenId === post._id && (
                                <div className="card shadow-sm position-absolute end-0 mt-4 more-menu">
                                    <button type="button" className="dropdown-item">
                                        Bookmark
                                    </button>
                                    <button type="button" className="dropdown-item">
                                        Report
                                    </button>
                                    {user && post.user && user.id === post.user._id && (
                                        <>
                                            <hr className="my-1" />
                                            <button type="button" className="dropdown-item">
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="dropdown-item text-danger fw-semibold"
                                                onClick={() => {
                                                    setMenuOpenId(null);
                                                    setDeleteId(post._id);
                                                }}
                                            >
                                                Delete broadcast
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <h5 className="fw-bold">{post.title}</h5>
                        <p>{post.body}</p>

                        {post.video && <VideoEmbed url={post.video} />}

                        <div className="d-flex justify-content-between">
                            <VoteButtons
                                id={post._id}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                onVote={vote}
                            />
                        </div>
                    </div>
                ))
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
