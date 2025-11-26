const BASE = "http://localhost:8080/api";

export const getUserAPI = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const deleteSelfAPI = async (password: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/users/me`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
    });
    return res.json();
};

export const updateUserAPI = async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/users/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const toggleBookmarkAPI = async (itemId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/users/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ itemId })
    });
    if (!res.ok) {
        throw new Error(`Failed to toggle bookmark: ${res.status}`);
    }
    return res.json();
};
