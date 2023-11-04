import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import UserLayout from "./components/UserLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);

export default router;
