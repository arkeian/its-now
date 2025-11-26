const BASE = "http://localhost:8080/api";

export const loginAPI = async (email: string, password: string) => {
    const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await res.json();
};

export const registerAPI = async (username: string, email: string, password: string) => {
    const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    return await res.json();
};
