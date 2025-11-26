import { useEffect, useState } from "react";

interface Meta {
    title?: string;
    description?: string;
    image?: { url?: string };
    logo?: { url?: string };
}

const LinkPreview = ({ url }: { url: string }) => {
    const [meta, setMeta] = useState<Meta | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    `https://api.microlink.io/?url=${encodeURIComponent(url)}`
                );
                const data = await res.json();
                if (data?.data) setMeta(data.data);
            } catch {
                setMeta(null);
            }
        })();
    }, [url]);

    if (!meta) return null;

    return (
        <a href={url} target="_blank" rel="noreferrer" className="text-decoration-none">
            <div className="card mt-2 p-2 shadow-sm">
                {meta.image?.url && (
                    <img src={meta.image.url} className="img-fluid rounded mb-2" />
                )}
                <h6 className="fw-bold">{meta.title}</h6>
                <p className="text-muted small">{meta.description}</p>
            </div>
        </a>
    );
};

export default LinkPreview;
