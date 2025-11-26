import { useState, useEffect } from "react";

interface Props {
    query: string;
    onSelect: (text: string) => void;
}

const suggestionsSource = [
    "lost phone",
    "best coffee",
    "scholarship",
    "assignment help",
    "clubs",
    "recruitment",
    "study spots",
    "cafeteria",
    "professor review",
    "cheap food",
    "housing",
    "internship",
];

const SearchSuggestions = ({ query, onSelect }: Props) => {
    const [filtered, setFiltered] = useState<string[]>([]);

    useEffect(() => {
        if (!query.trim()) {
            setFiltered([]);
            return;
        }
        const q = query.toLowerCase();
        const result = suggestionsSource.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
        setFiltered(result);
    }, [query]);

    if (filtered.length === 0) return null;

    return (
        <div className="border rounded bg-white shadow-sm mt-1 position-absolute w-100" style={{ zIndex: 20 }}>
            {filtered.map((s) => (
                <div
                    key={s}
                    className="p-2 suggestion-item"
                    onClick={() => onSelect(s)}
                    style={{ cursor: "pointer" }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {s}
                </div>
            ))}
        </div>
    );
};

export default SearchSuggestions;
