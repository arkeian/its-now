import { useEffect, useState } from "react";
import { getUserAPI, updateUserAPI } from "../apis/usersApi";
import ImageUpload from "../components/Upload/ImageUpload";
import { useToast } from "../components/Toast/Toast";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import { isNonEmptyString, isValidEmail } from "../utils/validators";

const badges = [
    "Contributor",
    "Helpful",
    "Verified",
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
];

const EditProfilePage = () => {
    const { pushToast } = useToast();
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setDesc] = useState("");
    const [badge, setBadge] = useState("");
    const [image, setImage] = useState("");
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        (async () => {
            const me = await getUserAPI();
            setUsername(me.username);
            setEmail(me.email);
            setDesc(me.description || "");
            setBadge(me.badge || "");
            setImage(me.image || "");
            setLoading(false);
        })();
    }, []);

    const validate = () => {
        const err: any = {};

        if (!isNonEmptyString(username, 32)) {
            err.username = "Username must be non-empty and at most 32 characters";
        }

        if (!isValidEmail(email)) {
            err.email = "Enter a valid email address";
        }

        if (desc.length > 1000) {
            err.desc = "Description must be at most 1000 characters";
        }

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const save = async () => {
        if (!validate()) return;

        setSaving(true);
        try {
            await updateUserAPI({
                username,
                email,
                description: desc,
                badge,
                image,
            });

            pushToast("Profile updated successfully!", "success");
            setShowConfirm(false);
        } catch (e) {
            pushToast("Failed to update profile.", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4 col-md-6">
            <h3 className="fw-bold mb-3">Edit Profile</h3>

            <ImageUpload onUpload={setImage} label="Profile Picture" />

            {image && (
                <img
                    src={image}
                    className="rounded-circle my-3"
                    alt="avatar"
                    style={{ width: 120, height: 120, objectFit: "cover" }}
                />
            )}

            <label className="form-label mt-3">Username</label>
            <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
                <small className="text-danger">{errors.username}</small>
            )}

            <label className="form-label mt-3">Email</label>
            <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}

            <label className="form-label mt-3">Badge</label>
            <select
                className="form-select"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
            >
                <option value="">None</option>
                {badges.map((b) => (
                    <option key={b} value={b}>
                        {b}
                    </option>
                ))}
            </select>

            <label className="form-label mt-3">Description</label>
            <textarea
                className="form-control"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            {errors.desc && <small className="text-danger">{errors.desc}</small>}

            <button
                className="btn btn-primary w-100 mt-4"
                onClick={() => setShowConfirm(true)}
                disabled={saving}
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>

            <Modal
                isOpen={showConfirm}
                title="Save profile changes?"
                confirmLabel="Save"
                cancelLabel="Review again"
                isProcessing={saving}
                onCancel={() => setShowConfirm(false)}
                onConfirm={save}
            >
                Your username, email, badge and description will be updated.
            </Modal>
        </div>
    );
};

export default EditProfilePage;
