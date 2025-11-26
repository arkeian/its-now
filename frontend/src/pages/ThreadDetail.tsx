import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { getThreadAPI, voteThreadAPI } from "../apis/threadsApi";
import { getCommentsAPI, createCommentAPI, voteCommentAPI } from "../apis/commentsApi";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import Comment from "../components/Comment/Comment";
import UserIcon from "../components/UserIcon/UserIcon";
import { useAutoSave } from "../hooks/useAutoSave";
import CommentSkeleton from "../components/Skeleton/CommentSkeleton";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import LinkPreview from "../components/Preview/LinkPreview";
import VideoEmbed from "../components/Upload/VideoUpload";
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

    const voteThread = async (id: string, type?: "up" | "down") => {
        const updated = await voteThreadAPI(id, type);
        setThread(updated);
    };

    const voteComment = async (cid: string, type?: "up" | "down") => {
        const updated = await voteCommentAPI(cid, type);
        setComments((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    };

    const submit = async () => {
        if (!editor.trim()) return;

        const res = await createCommentAPI(id!, { body: editor });
        setComments((prev) => [...prev, res]);
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

    if (loading) return null;

    const urls = extractLinks(thread.body);

    const buildCommentTree = (items: any[]) => {
        const byId: Record<string, any> = {};
        const roots: any[] = [];

        items.forEach((c: any) => {
            byId[c._id] = { ...c, replies: [] };
        });

        items.forEach((c: any) => {
            if (c.parent && byId[c.parent]) {
                byId[c.parent].replies.push(byId[c._id]);
            } else {
                roots.push(byId[c._id]);
            }
        });

        return roots;
    };

    const commentTree = buildCommentTree(comments);

    const handleCommentDeleted = (deletedId: string) => {
        setComments((prev) => prev.filter((c) => c._id !== deletedId && c.parent !== deletedId));
        // We don't know the exact subtree size on the client; let backend's
        // commentsCount be the source of truth and rely on a future refetch
        // if needed, so we no longer adjust commentsCount here.
    };

    const handleReplyAdded = (newComment: any) => {
        setComments((prev) => [...prev, newComment]);
    };

    const renderComment = (c: any, depth: number) => (
        <Comment
            key={c._id}
            comment={c}
            depth={depth}
            vote={voteComment}
            onDelete={handleCommentDeleted}
            onReplyAdded={handleReplyAdded}
        />
    );

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center gap-2 mb-2 small thread-meta">
                <UserIcon user={thread.user} small />
                <Link
                    to={`/user/${thread.user._id}`}
                    className="fw-semibold text-decoration-none thread-username-link"
                >
                    {thread.user.username}
                </Link>
                <span className="thread-date">· {new Date(thread.createdAt).toLocaleDateString()}</span>
                {thread.tags?.length > 0 && (
                    <div className="d-flex gap-1 flex-wrap ms-2">
                        {thread.tags.map((tag: string) => (
                            <span key={tag} className="badge bg-primary bg-opacity-75">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <h3 className="fw-bold mb-3">{thread.title}</h3>
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

            <h6 className="fw-semibold mb-2 mt-3">Add Comment</h6>
            <div className="border rounded p-3 mb-4">
                <RichTextEditor
                    value={editor}
                    onChange={setEditor}
                    placeholder="Write a comment..."
                />
                <div className="d-flex align-items-center justify-content-between mt-2">
                    <div>
                        {saving && editor && editor.replace(/<[^>]*>/g, "").trim().length > 0 && (
                            <small className="text-muted">Draft saved...</small>
                        )}
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={submit}>
                            Post
                        </button>
                    </div>
                </div>
            </div>

            <h5 className="fw-semibold mt-2 mb-3">Comments ({comments.length})</h5>

            {comments.length === 0 && (
                <>
                    <CommentSkeleton />
                    <CommentSkeleton />
                </>
            )}
            {commentTree.map((c) => renderComment(c, 0))}
        </div>
    );
};

export default ThreadPage;
