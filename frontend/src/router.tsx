import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ThreadPage from "./pages/Thread";
import BroadcastPage from "./pages/Broadcast";
import BroadcastDetailPage from "./pages/BroadcastDetail";
import CreateThreadPage from "./pages/CreateThread";
import CreateBroadcastPage from "./pages/CreateBroadcast";
import BookmarkPage from "./pages/Bookmark";
import UserProfilePage from "./pages/UserProfile";
import EditProfilePage from "./pages/EditProfile";
import NotFoundPage from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <DashboardPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/threads", element: <HomePage /> },
            { path: "/thread/:id", element: <ThreadPage /> },
            { path: "/broadcasts", element: <BroadcastPage /> },
            { path: "/broadcast/:id", element: <BroadcastDetailPage /> },
            { path: "/create-thread", element: <CreateThreadPage /> },
            { path: "/create-broadcast", element: <CreateBroadcastPage /> },
            { path: "/bookmarks", element: <BookmarkPage /> },
            { path: "/user/:id", element: <UserProfilePage /> },
            { path: "/edit-profile", element: <EditProfilePage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

