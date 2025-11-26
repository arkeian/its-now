import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<any>(() => {
        if (!token) return null;
        try {
            return jwtDecode(token);
        } catch {
            localStorage.removeItem("token");
            return null;
        }
    });

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(jwtDecode(newToken));
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
