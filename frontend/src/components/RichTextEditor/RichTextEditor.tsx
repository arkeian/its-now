import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "",
        editorProps: {
            attributes: {
                class: "rte-editor",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;
        // When the external value changes (e.g., loaded draft), update content.
        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);

    if (!editor) return null;

    return (
        <div className="rte-root">
            <div className="rte-toolbar mb-2">
                <button
                    type="button"
                    className={`btn btn-sm me-1 ${editor.isActive("bold") ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    aria-label="Bold"
                >
                    <span style={{ fontWeight: 700 }}>B</span>
                </button>
                <button
                    type="button"
                    className={`btn btn-sm me-1 ${editor.isActive("italic") ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    aria-label="Italic"
                >
                    <span style={{ fontStyle: "italic" }}>I</span>
                </button>
                <button
                    type="button"
                    className={`btn btn-sm me-1 ${editor.isActive("bulletList") ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    aria-label="Bulleted list"
                >
                    &#8226;
                </button>
                <button
                    type="button"
                    className={`btn btn-sm me-1 ${editor.isActive("orderedList") ? "btn-secondary" : "btn-outline-secondary"}`}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-label="Numbered list"
                >
                    1.
                </button>
            </div>
            <div className="rte-container">
                {placeholder && !value && (
                    <div className="rte-placeholder">{placeholder}</div>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
