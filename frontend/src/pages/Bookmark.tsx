import { useContext, useEffect, useState } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";
import { getThreadAPI } from "../apis/threadsApi";
import ThreadCard from "../components/ThreadCard/ThreadCard";
import Skeleton from "../components/Skeleton/Skeleton";

const BookmarkPage = () => {
    const { bookmarks } = useContext(BookmarkContext);
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);

        const list: any[] = [];
        for (const id of bookmarks) {
            const data = await getThreadAPI(id);
            list.push(data);
        }

        setItems(list);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [bookmarks]);

    return (
        <div className="container mt-4">
            <h3 className="fw-bold mb-3">Bookmarks</h3>

            {loading ? (
                [...Array(4)].map((_, i) => <Skeleton key={i} height={130} />)
            ) : items.length === 0 ? (
                <p className="text-muted">No bookmarks saved.</p>
            ) : (
                items.map((item) => (
                    <ThreadCard
                        key={item._id}
                        thread={item}
                        onVote={() => { }}
                    />
                ))
            )}
        </div>
    );
};

export default BookmarkPage;
