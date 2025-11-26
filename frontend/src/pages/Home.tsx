import { useEffect, useState, useRef, useContext } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import ThreadCard from "../components/ThreadCard/ThreadCard";
import Skeleton from "../components/Skeleton/Skeleton";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import SearchBar from "../components/SearchBar/SearchBar";
import { getThreadsAPI, voteThreadAPI } from "../apis/threadsApi";
import { getBroadcastsAPI } from "../apis/broadcastsApi";
import { Link } from "react-router-dom";
import UserIcon from "../components/UserIcon/UserIcon";
import GoTopButton from "../components/GoToTopButton/GoToTopButton";
import { useHotkeys } from "../hooks/useHotkeys";
import { AuthContext } from "../contexts/AuthContext";
import { buildThreadPreview } from "../utils/threadPreview";

const PAGE_SIZE = 8;

const HomePage = () => {
    useRequireLogin();
    const { token } = useContext(AuthContext);

    const [threads, setThreads] = useState<any[]>([]);
    const [sort, setSort] = useState("best");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [broadcasts, setBroadcasts] = useState<any[]>([]);

    const scrollLock = useRef(false);

    const fetchThreads = async (reset = false) => {
        if (!token) return;

        if (reset) {
            setPage(1);
            scrollLock.current = false;
            setLoading(true);
        }
        const startTime = Date.now();
        const data = await getThreadsAPI(sort, search);

        const slice = data.slice(0, PAGE_SIZE * (reset ? 1 : page));
        setThreads(slice);
        setHasMore(data.length > slice.length);

        const elapsed = Date.now() - startTime;
        const MIN_DURATION = 800;
        const remaining = Math.max(0, MIN_DURATION - elapsed);
        if (remaining === 0) {
            setLoading(false);
        } else {
            setTimeout(() => setLoading(false), remaining);
        }
    };

    const fetchBroadcasts = async () => {
        if (!token) return;
        try {
            const data = await getBroadcastsAPI();
            setBroadcasts(data.slice(0, 5));
        } catch {
            // ignore failures for sidebar preview
        }
    };

    useEffect(() => {
        fetchThreads(true);
        fetchBroadcasts();
    }, [sort, search]);

    // infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (loading || !hasMore) return;
            const offset = window.innerHeight + window.scrollY;

            if (offset >= document.body.offsetHeight - 200) {
                if (!scrollLock.current) {
                    scrollLock.current = true;
                    setPage((p) => p + 1);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    useEffect(() => {
        if (page === 1) return;
        fetchThreads();
        setTimeout(() => (scrollLock.current = false), 300);
    }, [page]);

    const vote = async (id: string, type?: "up" | "down") => {
        const updated = await voteThreadAPI(id, type);
        setThreads((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    };

    // pull-to-refresh
    useEffect(() => {
        let startY = 0;
        let pulling = false;

        const onStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                pulling = true;
                startY = e.touches[0].clientY;
            }
        };

        const onMove = (e: TouchEvent) => {
            if (!pulling) return;
            const diff = e.touches[0].clientY - startY;
            if (diff > 80) {
                fetchThreads(true);
                pulling = false;
            }
        };

        window.addEventListener("touchstart", onStart);
        window.addEventListener("touchmove", onMove);
        return () => {
            window.removeEventListener("touchstart", onStart);
            window.removeEventListener("touchmove", onMove);
        };
    }, []);

    // hotkeys navigation
    useHotkeys({
        j: () => window.scrollBy({ top: 300, behavior: "smooth" }),
        k: () => window.scrollBy({ top: -300, behavior: "smooth" }),
    });

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
                <SearchBar onSearch={setSearch} />
                <SortDropdown value={sort} onChange={setSort} />
            </div>

            <div className="row g-3">
                <div className="col-lg-8">
                    {/* Threads */}
                    {loading ? (
                        [...Array(6)].map((_, i) => <Skeleton key={i} height={150} />)
                    ) : (
                        threads.map((t) => <ThreadCard key={t._id} thread={t} onVote={vote} />)
                    )}

                    {hasMore && !loading && (
                        <div className="mt-3">
                            <Skeleton height={150} />
                            <Skeleton height={150} />
                        </div>
                    )}
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                    <div className="card p-3 shadow-sm border-0 broadcast-preview-card">
                        <h2 className="h6 fw-bold mb-3">Latest Broadcasts</h2>
                        <div className="d-flex flex-column gap-2">
                            {loading ? (
                                [...Array(3)].map((_, i) => <Skeleton key={i} height={80} />)
                            ) : (
                                broadcasts.map((b) => {
                                    const preview = buildThreadPreview(b.body || "");
                                    return (
                                        <div key={b._id} className="card border-0 mb-2 broadcast-preview-item">
                                            <div className="card-body py-2">
                                                <div className="d-flex align-items-center gap-2 mb-1 small">
                                                    <div className="d-flex align-items-center gap-2 broadcast-user">
                                                        {b.user && <UserIcon user={b.user} small />}
                                                        {b.user && (
                                                            <Link
                                                                to={`/user/${b.user._id}`}
                                                                className="fw-semibold text-truncate broadcast-username-link"
                                                            >
                                                                {b.user.username}
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                                {b.title && (
                                                    <h3 className="h6 fw-semibold mb-1 broadcast-title text-truncate">
                                                        {b.title}
                                                    </h3>
                                                )}
                                                <div
                                                    className="broadcast-body-preview"
                                                    dangerouslySetInnerHTML={{ __html: preview.html }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            {broadcasts.length === 0 && (
                                <p className="text-muted small mb-2">No broadcasts yet.</p>
                            )}
                        </div>
                        <div className="mt-2 text-end">
                            <Link to="/broadcasts" className="btn btn-outline-primary btn-sm">
                                Go to Broadcasts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <GoTopButton />
        </div>
    );
};

export default HomePage;
