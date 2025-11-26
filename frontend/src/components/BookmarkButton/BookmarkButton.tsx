import { useContext, useState } from "react";
import { FiBookmark, FiBookmark as FillBookmark } from "react-icons/fi";
import { toggleBookmarkAPI } from "../../apis/usersApi";
import { BookmarkContext } from "../../contexts/BookmarkContext";

interface Props {
    id: string;
}

const BookmarkButton = ({ id }: Props) => {
    const { bookmarks, setBookmarks } = useContext(BookmarkContext);
    const [active, setActive] = useState(bookmarks.includes(id));

    const toggle = async () => {
        const res = await toggleBookmarkAPI(id);
        setBookmarks(res.bookmarks);
        setActive(res.bookmarks.includes(id));
    };

    return (
        <button className="btn btn-outline-secondary btn-sm bookmark-btn" onClick={toggle}>
            {active ? <FillBookmark /> : <FiBookmark />}
        </button>
    );
};

export default BookmarkButton;
