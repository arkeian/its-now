import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getUserAPI } from "../apis/usersApi";

interface BookmarkContextType {
    bookmarks: string[];
    setBookmarks: (x: string[]) => void;
    loadBookmarks: () => Promise<void>;
}

export const BookmarkContext = createContext<BookmarkContextType>({
    bookmarks: [],
    setBookmarks: () => { },
    loadBookmarks: async () => { }
});

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const [bookmarks, setBookmarksState] = useState<string[]>(
        JSON.parse(localStorage.getItem("bookmarks") || "[]")
    );

    const setBookmarks = (list: string[]) => {
        setBookmarksState(list);
        localStorage.setItem("bookmarks", JSON.stringify(list));
    };

    const loadBookmarks = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setBookmarks([]);
                return;
            }
            const user = await getUserAPI();
            if (user && user.bookmarks) {
                setBookmarks(user.bookmarks);
            }
        } catch (error) {
            console.error("Failed to load bookmarks:", error);
        }
    };

    useEffect(() => {
        loadBookmarks();
    }, []);

    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks, loadBookmarks }}>
            {children}
        </BookmarkContext.Provider>
    );
};
