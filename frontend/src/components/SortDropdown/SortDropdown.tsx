import { FiChevronDown } from "react-icons/fi";

interface Props {
    value: string;
    onChange: (v: string) => void;
}

const labels: Record<string, string> = {
    best: "Best",
    recent: "Recent",
    controversial: "Controversial",
    hot: "Hot",
};

const SortDropdown = ({ value, onChange }: Props) => (
    <div className="sort-dropdown">
        <button type="button" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
            <span>{labels[value] ?? "Sort"}</span>
            <FiChevronDown />
        </button>
        <div className="sort-dropdown-menu">
            {Object.entries(labels).map(([key, label]) => (
                <button
                    key={key}
                    type="button"
                    className={`dropdown-item${key === value ? " active" : ""}`}
                    onClick={() => onChange(key)}
                >
                    {label}
                </button>
            ))}
        </div>
    </div>
);

export default SortDropdown;
