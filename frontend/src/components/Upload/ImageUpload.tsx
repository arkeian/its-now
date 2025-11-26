import { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import Modal from "../Modal/Modal";

interface Props {
    onUpload: (url: string) => void;
    label?: string;
}

const ImageUpload = ({ onUpload, label = "Upload Image" }: Props) => {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (!file) return;
        await upload(file);
    };

    const handleSelect = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        await upload(file);
    };

    const toBase64 = (file: File) =>
        new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });

    const upload = async (file: File) => {
        setPreview(URL.createObjectURL(file));
        setProgress(20);
        setShowModal(true);

        const base64 = await toBase64(file);
        setProgress(50);

        const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ image: base64 }),
        });

        const data = await res.json();
        setProgress(100);

        setTimeout(() => {
            setProgress(0);
            setShowModal(false);
        }, 800);

        onUpload(data.url);
    };

    return (
        <div className="mb-3">
            <label className="form-label fw-semibold">{label}</label>

            <div
                className={`border rounded d-flex flex-column align-items-center justify-content-center p-4 ${dragging ? "bg-light" : ""
                    }`}
                style={{ cursor: "pointer" }}
                onClick={() => fileInput.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <FiUploadCloud size={36} className="mb-2" />
                <p className="mb-0">Drop or click to upload</p>
            </div>

            <input
                type="file"
                hidden
                ref={fileInput}
                accept="image/*"
                onChange={handleSelect}
            />

            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="preview"
                        className="img-fluid rounded mb-2"
                    />
                </div>
            )}

            <Modal
                isOpen={showModal}
                title="Uploading image..."
                cancelLabel="Cancel upload"
                onCancel={() => {
                    // simple UX-only cancel: just hide modal; upload already in-flight in this implementation
                    setShowModal(false);
                }}
            >
                <div className="mb-2">Please wait while we process your image.</div>
                <div className="progress">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </Modal>
        </div>
    );
};

export default ImageUpload;
