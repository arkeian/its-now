import { useContext, useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { toggleBookmarkAPI } from "../../apis/usersApi";
import { BookmarkContext } from "../../contexts/BookmarkContext";

interface Props {
    id: string;
}

const BookmarkButton = ({ id }: Props) => {
    const { bookmarks, setBookmarks } = useContext(BookmarkContext);
    const [active, setActive] = useState(bookmarks.includes(id));

    useEffect(() => {
        setActive(bookmarks.includes(id));
    }, [bookmarks, id]);

    const toggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await toggleBookmarkAPI(id);
            if (res && res.bookmarks) {
                setBookmarks(res.bookmarks);
                setActive(res.bookmarks.includes(id));
            }
        } catch (error) {
            console.error("Failed to toggle bookmark:", error);
        }
    };

    return (
        <button
            className="btn btn-outline-secondary btn-sm bookmark-btn"
            onClick={toggle}
            type="button"
        >
            {active ? <BsBookmarkFill /> : <FiBookmark />}
        </button>
    );
};

export default BookmarkButton;
