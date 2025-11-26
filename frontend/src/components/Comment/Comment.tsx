import { useContext, useState } from "react";
import { createCommentAPI, deleteCommentAPI, updateCommentAPI } from "../../apis/commentsApi";
import VoteButtons from "../VoteButtons/VoteButtons";
import { useAutoSave } from "../../hooks/useAutoSave";
import { FiChevronDown, FiChevronUp, FiMoreHorizontal } from "react-icons/fi";
import UserIcon from "../UserIcon/UserIcon";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../Toast/useToast";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

interface Props {
    comment: any;
    depth: number;
    vote: (id: string, type: "up" | "down") => void;
}

const Comment = ({ comment, depth, vote }: Props) => {
    const { user } = useContext(AuthContext);
    const { pushToast } = useToast();

    const [collapsed, setCollapsed] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [editor, setEditor] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editBody, setEditBody] = useState(comment.body);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const draftKey = `comment-draft-${comment._id}`;
    const { saveDraft, loadDraft, clearDraft } = useAutoSave(draftKey);

    useState(() => setEditor(loadDraft()));

    const submitReply = async () => {
        if (!editor.trim()) return;
        const res = await createCommentAPI(comment.thread, {
            body: editor,
            parent: comment._id,
        });

        comment.replies = [...(comment.replies || []), res];
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

    const isOwner = user && comment.user && user.id === comment.user._id;

    return (
        <div className="mt-3" style={{ marginLeft: depth * 18 }}>
            <div className="d-flex align-items-center gap-2 position-relative">
                <UserIcon user={comment.user} small />
                <span className="fw-semibold">{comment.user.username}</span>

                <button
                    type="button"
                    className="btn btn-sm btn-link position-absolute end-0 top-0 text-muted"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="More actions"
                >
                    <FiMoreHorizontal />
                </button>

                {menuOpen && (
                    <div className="card shadow-sm position-absolute end-0 mt-4 more-menu">
                        <button type="button" className="dropdown-item">
                            Bookmark
                        </button>
                        <button type="button" className="dropdown-item">
                            Report
                        </button>
                        {isOwner && (
                            <>
                                <hr className="my-1" />
                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => {
                                        setEditing(true);
                                        setMenuOpen(false);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="dropdown-item text-danger fw-semibold"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setConfirmDelete(true);
                                    }}
                                >
                                    Delete comment
                                </button>
                            </>
                        )}
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

                {depth < 4 && (
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setReplyMode(!replyMode)}
                    >
                        Reply
                    </button>
                )}

                {comment.replies?.length > 0 && (
                    <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <FiChevronDown /> : <FiChevronUp />} {collapsed ? "Expand" : "Collapse"}
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
                    <Comment key={rep._id} comment={rep} depth={depth + 1} vote={vote} />
                ))}

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
                    comment.body = "[deleted]";
                    setConfirmDelete(false);
                }}
            >
                This comment and its replies will be removed.
            </Modal>
        </div>
    );
};

export default Comment;
