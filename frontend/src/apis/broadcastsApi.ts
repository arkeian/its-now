const BASE = "http://localhost:8080/api";

export const getBroadcastsAPI = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/broadcasts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.json();
};

export const createBroadcastAPI = async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/broadcasts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const voteBroadcastAPI = async (id: string, type: "up" | "down") => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/broadcasts/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type })
    });
    return res.json();
};

export const updateBroadcastAPI = async (id: string, partial: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/broadcasts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partial),
    });
    return res.json();
};

export const deleteBroadcastAPI = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE}/broadcasts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
