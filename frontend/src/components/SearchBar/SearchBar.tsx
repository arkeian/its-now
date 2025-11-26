import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = ({ onSearch }: { onSearch: (q: string) => void }) => {
    const [text, setText] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => onSearch(text), 350);
        return () => clearTimeout(timeout);
    }, [text]);

    const choose = (s: string) => {
        setText(s);
        onSearch(s);
    };

    return (
        <div className="position-relative" ref={wrapperRef} style={{ width: "270px" }}>
            <div className="input-group">
                <span className="input-group-text search-icon-wrapper">
                    <FiSearch />
                </span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search threads…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <SearchSuggestions query={text} onSelect={choose} />
        </div>
    );
};

export default SearchBar;
