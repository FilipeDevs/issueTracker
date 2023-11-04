import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function UserLayout() {
    return (
        <main className="">
            <Sidebar />
            <div className="h-screen bg-blue-100">
                <h1></h1>
                <Outlet />
            </div>
        </main>
    );
}

export default UserLayout;
