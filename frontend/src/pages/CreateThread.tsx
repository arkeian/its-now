import { useState, useEffect } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { createThreadAPI } from "../apis/threadsApi";
import ImageUpload from "../components/Upload/ImageUpload";
import { useAutoSave } from "../hooks/useAutoSave";
import { useToast } from "../components/Toast/useToast";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

const TAGS = ["Lost & Found", "Academic", "Event", "Recruitment", "Casual"];

const CreateThreadPage = () => {
    useRequireLogin();
    const { pushToast } = useToast();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tag, setTag] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [saving, setSaving] = useState(false);

    const draft = useAutoSave("draft-create-thread");

    useEffect(() => {
        const loaded = draft.loadDraft();
        if (loaded) {
            try {
                const parsed = JSON.parse(loaded);
                setTitle(parsed.title || "");
                setBody(parsed.body || "");
                setTag(parsed.tag || "");
                setImage(parsed.image || "");
                setVideo(parsed.video || "");
            } catch { }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            draft.saveDraft(JSON.stringify({ title, body, tag, image, video }));
            setSaving(true);
            setTimeout(() => setSaving(false), 300);
        }, 3000);
        return () => clearInterval(interval);
    }, [title, body, tag, image, video]);

    const submit = async () => {
        if (!title.trim() || !body.trim()) {
            pushToast("Title and body are required", "error");
            return;
        }

        const res = await createThreadAPI({
            title,
            body,
            tags: tag ? [tag] : [],
            image,
            video,
        });

        if (res._id) {
            draft.clearDraft();
            pushToast("Thread created!", "success");
            window.location.href = `/thread/${res._id}`;
        }
    };

    return (
        <div className="container mt-4 col-md-8">

            <h3 className="fw-bold mb-3">Create Thread</h3>

            <label className="form-label fw-semibold">Title</label>
            <input
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form-label fw-semibold">Tag / Flair</label>
            <select
                className="form-select mb-3"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            >
                <option value="">None</option>
                {TAGS.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <label className="form-label fw-semibold">Body</label>
            <div className="border rounded p-2">
                <RichTextEditor
                    value={body}
                    onChange={setBody}
                    placeholder="Write your post..."
                />
                {saving && <small className="text-muted">Draft saved…</small>}
            </div>

            <ImageUpload label="Optional Image" onUpload={setImage} />

            {image && (
                <img src={image} className="img-fluid rounded mt-3" alt="preview" />
            )}

            <label className="form-label fw-semibold mt-3">Optional Video URL (YouTube, etc.)</label>
            <input
                className="form-control mb-1"
                placeholder="https://www.youtube.com/watch?v=..."
                value={video}
                onChange={(e) => setVideo(e.target.value)}
            />

            <button className="btn btn-primary w-100 mt-4" onClick={submit}>
                Post Thread
            </button>

        </div>
    );
};

export default CreateThreadPage;
