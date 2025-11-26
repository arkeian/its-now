import { useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { createBroadcastAPI } from "../apis/broadcastsApi";
import ImageUpload from "../components/Upload/ImageUpload";
import { useAutoSave } from "../hooks/useAutoSave";
import { useToast } from "../components/Toast/Toast";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

const CreateBroadcastPage = () => {
    useRequireLogin();
    const { pushToast } = useToast();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [saving, setSaving] = useState(false);

    const draft = useAutoSave("draft-create-broadcast");

    useEffect(() => {
        const loaded = draft.loadDraft();
        if (loaded) {
            const parsed = JSON.parse(loaded);
            setTitle(parsed.title || "");
            setBody(parsed.body || "");
            setImage(parsed.image || "");
            setVideo(parsed.video || "");
        }
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            draft.saveDraft(JSON.stringify({ title, body, image, video }));
            setSaving(true);
            setTimeout(() => setSaving(false), 250);
        }, 3000);

        return () => clearInterval(id);
    }, [title, body, image]);

    const submit = async () => {
        if (!title.trim() || !body.trim()) {
            pushToast("Title and body cannot be empty", "error");
            return;
        }

        const res = await createBroadcastAPI({ title, body, image, video });

        if (res._id) {
            draft.clearDraft();
            pushToast("Broadcast posted!", "success");
            window.location.href = "/broadcasts";
        }
    };

    return (
        <div className="container mt-4 col-md-8">

            <h3 className="fw-bold mb-3">Create Broadcast</h3>

            <label className="form-label fw-semibold">Title</label>
            <input
                className="form-control mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form-label fw-semibold">Body</label>
            <div className="border rounded p-2">
                <RichTextEditor
                    value={body}
                    onChange={setBody}
                    placeholder="Write your announcement..."
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
                Post Broadcast
            </button>

        </div>
    );
};

export default CreateBroadcastPage;
