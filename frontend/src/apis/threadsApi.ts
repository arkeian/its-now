const BASE = "http://localhost:8080/api";

export const getThreadsAPI = async (sort = "best", search = "", tag = "") => {
    const params = new URLSearchParams();
    if (sort) params.append("sort", sort);
    if (search) params.append("search", search);
    if (tag) params.append("tag", tag);

    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const getThreadAPI = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const createThreadAPI = async (thread: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(thread)
    });
    return res.json();
};

export const voteThreadAPI = async (id: string, type: "up" | "down" | undefined) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type })
    });
    return res.json();
};

export const updateThreadAPI = async (id: string, partial: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partial),
    });
    return res.json();
};

export const deleteThreadAPI = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/threads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
