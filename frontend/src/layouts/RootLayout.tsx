import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useScrollMemory } from "../hooks/useScrollMemory";

const RootLayout = () => {
    useScrollMemory();

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default RootLayout;
