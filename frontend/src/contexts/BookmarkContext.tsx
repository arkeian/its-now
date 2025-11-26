import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface BookmarkContextType {
    bookmarks: string[];
    setBookmarks: (x: string[]) => void;
}

export const BookmarkContext = createContext<BookmarkContextType>({
    bookmarks: [],
    setBookmarks: () => { }
});

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const [bookmarks, setBookmarksState] = useState<string[]>(
        JSON.parse(localStorage.getItem("bookmarks") || "[]")
    );

    const setBookmarks = (list: string[]) => {
        setBookmarksState(list);
        localStorage.setItem("bookmarks", JSON.stringify(list));
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
            {children}
        </BookmarkContext.Provider>
    );
};
