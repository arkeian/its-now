import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { ToastProvider } from "./components/Toast/Toast";

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BookmarkProvider>
                    <ToastProvider>
                        <RouterProvider router={router} />
                    </ToastProvider>
                </BookmarkProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
