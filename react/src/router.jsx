import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import UserLayout from "./components/UserLayout";
import Dashboard from "./views/Dashboard";
import Tickets from "./views/Tickets";
import Project from "./views/Project";
import NotFound from "./views/NotFound";
import Ticket from "./views/Ticket";
import Users from "./views/Users";

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
            {
                path: "/project/:id",
                element: <Project />,
            },
            {
                path: "/project/:project/ticket/:id",
                element: <Ticket />,
            },

            {
                path: "/tickets",
                element: <Tickets />,
            },
            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
