import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { voteBroadcastAPI, getBroadcastAPI } from "../apis/broadcastsApi";
import { getBroadcastCommentsAPI, createBroadcastCommentAPI, voteCommentAPI } from "../apis/commentsApi";
import VoteButtons from "../components/VoteButtons/VoteButtons";
import Comment from "../components/Comment/Comment";
import UserIcon from "../components/UserIcon/UserIcon";
import { useAutoSave } from "../hooks/useAutoSave";
import CommentSkeleton from "../components/Skeleton/CommentSkeleton";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";
import VideoEmbed from "../components/Upload/VideoEmbed";
import { extractLinks } from "../utils/linkPreview";
import LinkPreview from "../components/Preview/LinkPreview";

const BroadcastDetailPage = () => {
    useRequireLogin();
    const { id } = useParams();

    const [broadcast, setBroadcast] = useState<any | null>(null);
    const [author, setAuthor] = useState<any | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [editor, setEditor] = useState("");
    const [saving, setSaving] = useState(false);

    const draft = useAutoSave(`broadcast-comment-${id}`);

    useEffect(() => {
        setEditor(draft.loadDraft());
    }, []);

    const load = async () => {
        if (!id) return;
        const b = await getBroadcastAPI(id);
        const c = await getBroadcastCommentsAPI(id);
        setBroadcast(b);
        setAuthor(b.user || null);
        // Ensure each comment knows its parent broadcast for reply API
        setComments(c.map((cm: any) => ({ ...cm, broadcast: id })));
        setLoading(false);
    };

    useEffect(() => {
        load();
    }, [id]);

    const voteBroadcast = async (bid: string, type?: "up" | "down") => {
        const updated = await voteBroadcastAPI(bid, type);
        // Keep author stable; only update votes and other fields
        setBroadcast((prev: any) => {
            if (!prev) return updated;
            return {
                ...prev,
                ...updated,
                user: author || prev.user,
            };
        });
    };

    const voteComment = async (cid: string, type?: "up" | "down") => {
        const updated = await voteCommentAPI(cid, type);
        setComments((prev) =>
            prev.map((c) =>
                c._id === updated._id
                    ? {
                        ...c,
                        ...updated,
                        // Ensure we never lose the user object that
                        // drives the username/avatar display
                        user: c.user || updated.user || null,
                    }
                    : c,
            ),
        );
    };

    const submit = async () => {
        if (!editor.trim() || !id) return;
        const res = await createBroadcastCommentAPI(id, { body: editor });
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

    if (loading || !broadcast) return null;

    const urls = extractLinks(broadcast.body);

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
                {author && (
                    <>
                        <UserIcon user={author} small />
                        <Link
                            to={`/user/${author._id}`}
                            className="fw-semibold text-decoration-none thread-username-link"
                        >
                            {author.username}
                        </Link>
                    </>
                )}
                <span className="thread-date">· {new Date(broadcast.createdAt).toLocaleDateString()}</span>
            </div>

            <h3 className="fw-bold mb-3">{broadcast.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: broadcast.body }} className="mb-3" />

            {urls.length > 0 && (
                <div>
                    {urls.map((u) => (
                        <LinkPreview key={u} url={u} />
                    ))}
                </div>
            )}

            {broadcast.image && (
                <div className="media-frame mb-3">
                    <img src={broadcast.image} alt="" className="media-img" />
                </div>
            )}

            {broadcast.video && <VideoEmbed url={broadcast.video} />}

            <VoteButtons
                id={broadcast._id}
                upvotes={broadcast.upvotes}
                downvotes={broadcast.downvotes}
                onVote={voteBroadcast}
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

export default BroadcastDetailPage;
