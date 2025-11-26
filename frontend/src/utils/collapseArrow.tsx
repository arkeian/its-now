export const CollapseArrow = ({ open }: { open: boolean }) => {
    return (
        <span style={{ display: "inline-block", transition: "0.2s" }}>
            {open ? "▲" : "▼"}
        </span>
    );
};
