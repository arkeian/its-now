import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";
import { getThreadAPI } from "../apis/threadsApi";
import { getBroadcastAPI } from "../apis/broadcastsApi";
import ThreadCard from "../components/ThreadCard/ThreadCard";
import Skeleton from "../components/Skeleton/Skeleton";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import BookmarkButton from "../components/BookmarkButton/BookmarkButton";
import UserIcon from "../components/UserIcon/UserIcon";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import VideoEmbed from "../components/Upload/VideoUpload";

const BookmarkPage = () => {
    const { bookmarks } = useContext(BookmarkContext);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);

        const list: any[] = [];
        for (const id of bookmarks) {
            try {
                // Try to fetch as thread first
                const threadData = await getThreadAPI(id);
                if (threadData && !threadData.error && !threadData.msg) {
                    list.push({ ...threadData, type: 'thread' });
                    continue;
                }
            } catch (error) {
                // If thread fetch fails, try broadcast
            }

            try {
                const broadcastData = await getBroadcastAPI(id);
                if (broadcastData && !broadcastData.error && !broadcastData.msg) {
                    list.push({ ...broadcastData, type: 'broadcast' });
                }
            } catch (error) {
                console.error(`Failed to fetch bookmark ${id}:`, error);
            }
        }

        setItems(list);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [bookmarks]);

    const renderBroadcast = (item: any) => {
        if (!item.user) {
            return null;
        }

        return (
            <article className="card p-3 mb-3 shadow-sm border-0 thread-card" key={item._id}>
                <div className="d-flex align-items-center gap-2 mb-1 small thread-meta position-relative">
                    <UserIcon user={item.user} small />
                    <Link
                        to={`/user/${item.user._id}`}
                        className="fw-semibold text-decoration-none thread-username-link"
                    >
                        {item.user.username}
                    </Link>
                    <span className="thread-date">
                        · {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <Link to={`/broadcast/${item._id}`} className="text-decoration-none thread-card-link">
                    <h2 className="h6 fw-bold mb-2 thread-title">{item.title}</h2>
                    <p className="mb-2">{item.body}</p>
                </Link>

                {item.video && <VideoEmbed url={item.video} />}

                <div className="thread-card-actions d-flex align-items-center gap-3 mt-2 small">
                    <VoteButtons
                        id={item._id}
                        upvotes={item.upvotes}
                        downvotes={item.downvotes}
                        onVote={() => { }}
                    />
                    <button
                        type="button"
                        className="btn btn-sm btn-link d-flex align-items-center gap-1 px-0"
                    >
                        <FiMessageCircle />
                        <span>{item.commentsCount ?? 0}</span>
                    </button>
                    <BookmarkButton id={item._id} />
                </div>
            </article>
        );
    };

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">Bookmarks</h3>

            {loading ? (
                [...Array(4)].map((_, i) => <Skeleton key={i} height={130} />)
            ) : items.length === 0 ? (
                <p className="text-muted">No bookmarks saved.</p>
            ) : (
                items.map((item) => (
                    item.type === 'broadcast' ? renderBroadcast(item) : (
                        <ThreadCard
                            key={item._id}
                            thread={item}
                            onVote={() => { }}
                        />
                    )
                ))
            )}
        </div>
    );
};

export default BookmarkPage;
