import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { getThreadAPI, voteThreadAPI } from "../apis/threadsApi";
import { getCommentsAPI, createCommentAPI, voteCommentAPI } from "../apis/commentsApi";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import Loader from "../components/Loader/Loader";
import Comment from "../components/Comment/Comment";
import { useAutoSave } from "../hooks/useAutoSave";
import CommentSkeleton from "../components/Skeleton/CommentSkeleton";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import LinkPreview from "../components/Preview/LinkPreview";
import VideoEmbed from "../components/Upload/VideoEmbed";
import { extractLinks } from "../utils/linkPreview";

const ThreadPage = () => {
    useRequireLogin();
    const { id } = useParams();

    const [thread, setThread] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [editor, setEditor] = useState("");
    const [saving, setSaving] = useState(false);

    const draft = useAutoSave(`thread-comment-${id}`);

    useEffect(() => {
        setEditor(draft.loadDraft());
    }, []);

    const load = async () => {
        const t = await getThreadAPI(id!);
        const c = await getCommentsAPI(id!);
        setThread(t);
        setComments(c);
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [id]);

    const voteThread = async (id: string, type: "up" | "down") => {
        const updated = await voteThreadAPI(id, type);
        setThread(updated);
    };

    const voteComment = async (cid: string, type: "up" | "down") => {
        const updated = await voteCommentAPI(cid, type);
        setComments((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    };

    const submit = async () => {
        if (!editor.trim()) return;

        const res = await createCommentAPI(id!, { body: editor });
        setComments([...comments, res]);
        setEditor("");
        draft.clearDraft();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            draft.saveDraft(editor);
            setSaving(true);
            setTimeout(() => setSaving(false), 500);
        }, 3000);
        return () => clearInterval(interval);
    }, [editor]);

    if (loading) return <Loader />;

    const urls = extractLinks(thread.body);

    return (
        <div className="container mt-4">

            <h3 className="fw-bold">{thread.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: thread.body }} className="mb-3" />

            {urls.length > 0 && (
                <div>
                    {urls.map((u) => (
                        <LinkPreview key={u} url={u} />
                    ))}
                </div>
            )}

            {thread.image && (
                <div className="media-frame mb-3">
                    <img src={thread.image} alt="" className="media-img" />
                </div>
            )}

            {thread.video && <VideoEmbed url={thread.video} />}

            <VoteButtons
                id={thread._id}
                upvotes={thread.upvotes}
                downvotes={thread.downvotes}
                onVote={voteThread}
            />

            <hr />

            <h5 className="fw-semibold">Comments ({comments.length})</h5>

            {comments.length === 0 && (
                <>
                    <CommentSkeleton />
                    <CommentSkeleton />
                </>
            )}

            {comments.map((c) => (
                <Comment key={c._id} comment={c} depth={0} vote={voteComment} />
            ))}

            <hr />

            <h6 className="fw-semibold mb-1">Add Comment</h6>
            <div className="border rounded p-2">
                <RichTextEditor
                    value={editor}
                    onChange={setEditor}
                    placeholder="Write a comment..."
                />

                {saving && <small className="text-muted">Draft saved...</small>}

                <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-primary" onClick={submit}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreadPage;
