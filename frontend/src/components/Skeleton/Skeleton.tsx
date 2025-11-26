const Skeleton = ({ height = 20 }: { height?: number }) => (
    <div
        className="skeleton rounded w-100 mb-2"
        style={{ height }}
    ></div>
);
export default Skeleton;
