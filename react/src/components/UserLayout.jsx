import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function UserLayout() {
    return (
        <main>
            <Sidebar />
            <Outlet />
        </main>
    );
}

export default UserLayout;
