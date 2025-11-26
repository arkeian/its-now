const BASE = "http://localhost:8080/api";

export const getCommentsAPI = async (threadId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/comments/${threadId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const createCommentAPI = async (threadId: string, data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/comments/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const voteCommentAPI = async (id: string, type: "up" | "down") => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/comments/vote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type })
    });
    return res.json();
};

export const updateCommentAPI = async (id: string, partial: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partial),
    });
    return res.json();
};

export const deleteCommentAPI = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
