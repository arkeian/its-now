import { useContext, useState } from "react";
import { createCommentAPI, createBroadcastCommentAPI, deleteCommentAPI, updateCommentAPI } from "../../apis/commentsApi";
import VoteButtons from "../VoteButtons/VoteButtons";
import { useAutoSave } from "../../hooks/useAutoSave";
import UserIcon from "../UserIcon/UserIcon";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../Toast/Toast";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

interface Props {
    comment: any;
    depth: number;
    vote: (id: string, type?: "up" | "down") => void;
    onDelete?: (id: string) => void;
    onReplyAdded?: (comment: any) => void;
}

const Comment = ({ comment, depth, vote, onDelete, onReplyAdded }: Props) => {
    const { user } = useContext(AuthContext);
    const { pushToast } = useToast();

    const [collapsed, setCollapsed] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [editor, setEditor] = useState("");
    const [editing, setEditing] = useState(false);
    const [editBody, setEditBody] = useState(comment.body);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const draftKey = `comment-draft-${comment._id}`;
    const { saveDraft, loadDraft, clearDraft } = useAutoSave(draftKey);

    useState(() => setEditor(loadDraft()));

    const submitReply = async () => {
        if (!editor.trim()) return;

        let res;
        if (comment.thread) {
            // Reply on a thread comment
            res = await createCommentAPI(comment.thread, {
                body: editor,
                parent: comment._id,
            });
        } else if (comment.broadcast) {
            // Reply on a broadcast comment
            res = await createBroadcastCommentAPI(comment.broadcast, {
                body: editor,
                parent: comment._id,
            });
        } else {
            return;
        }

        onReplyAdded?.(res);
        setReplyMode(false);
        setEditor("");
        clearDraft();
    };

    useState(() => {
        const interval = setInterval(() => {
            saveDraft(editor);
        }, 3000);
        return () => clearInterval(interval);
    });

    // OP (original poster) badge for thread creator
    const isOp =
        comment.thread &&
        comment.user &&
        comment.thread.user &&
        comment.user._id === comment.thread.user._id;

    return (
        <div className="mt-3 d-flex">
            {depth > 0 && (
                <button
                    type="button"
                    className="comment-thread-line btn p-0 border-0 bg-transparent"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? "Expand replies" : "Collapse replies"}
                />
            )}

            <div
                className="flex-grow-1"
                style={{ marginLeft: depth > 0 ? 8 : 0 }}
            >
                <div className="d-flex align-items-center gap-2 position-relative small">
                    <UserIcon user={comment.user} small />
                    {isOp && (
                        <span className="badge bg-primary bg-opacity-75 text-uppercase small">OP</span>
                    )}
                    {comment.user ? (
                        <a
                            href={`/user/${comment.user._id}`}
                            className="fw-semibold text-decoration-none thread-username-link"
                        >
                            {comment.user.username}
                        </a>
                    ) : (
                        <span className="fw-semibold text-decoration-none thread-username-link">
                            Unknown
                        </span>
                    )}
                    {comment.createdAt && (
                        <span className="text-muted">· {new Date(comment.createdAt).toLocaleDateString()}</span>
                    )}
                    {comment.user?.tags?.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 ms-1">
                            {comment.user.tags.map((tag: string) => (
                                <span key={tag} className="badge bg-secondary bg-opacity-75">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {editing ? (
                    <div className="border rounded p-2 my-2">
                        <RichTextEditor value={editBody} onChange={setEditBody} />
                        <div className="d-flex justify-content-end gap-2 mt-2">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={async () => {
                                    const updated = await updateCommentAPI(comment._id, { body: editBody });
                                    comment.body = updated.body;
                                    setEditing(false);
                                    pushToast("Comment updated", "success");
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-1 mb-2" dangerouslySetInnerHTML={{ __html: comment.body }} />
                )}

                <div className="d-flex align-items-center gap-3 mb-2">
                    <VoteButtons
                        id={comment._id}
                        upvotes={comment.upvotes}
                        downvotes={comment.downvotes}
                        onVote={vote}
                    />

                    {user && comment.user && (user.id === comment.user._id || user._id === comment.user._id) && (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            onClick={() => setConfirmDelete(true)}
                        >
                            Delete
                        </button>
                    )}

                    {depth < 4 && (
                        <button
                            className="btn btn-sm btn-outline-secondary comment-reply-btn"
                            onClick={() => setReplyMode(!replyMode)}
                        >
                            Reply
                        </button>
                    )}
                </div>

                {replyMode && depth < 4 && (
                    <div className="border rounded p-2 mb-2">
                        <RichTextEditor value={editor} onChange={setEditor} />

                        <div className="d-flex justify-content-end mt-2 gap-2">
                            <button className="btn btn-secondary btn-sm" onClick={() => setReplyMode(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary btn-sm" onClick={submitReply}>
                                Post reply
                            </button>
                        </div>
                    </div>
                )}

                {!collapsed &&
                    comment.replies &&
                    comment.replies.map((rep: any) => (
                        <Comment
                            key={rep._id}
                            comment={rep}
                            depth={depth + 1}
                            vote={vote}
                            onDelete={onDelete}
                            onReplyAdded={onReplyAdded}
                        />
                    ))}
            </div>

            <Modal
                isOpen={confirmDelete}
                title="Delete this comment?"
                confirmLabel="Delete comment"
                cancelLabel="Cancel"
                isDestructive
                onCancel={() => setConfirmDelete(false)}
                onConfirm={async () => {
                    await deleteCommentAPI(comment._id);
                    pushToast("Comment deleted", "success");
                    setConfirmDelete(false);
                    onDelete?.(comment._id);
                }}
            >
                This comment and its replies will be removed.
            </Modal>
        </div>
    );
};

export default Comment;
