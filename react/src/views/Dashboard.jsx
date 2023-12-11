import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import DashboardTable from "../components/tables/DashboardTable";
import DeveloperDashboardTable from "../components/tables/DeveloperDashboardTable";

function Dashboard() {
    const { user, token } = useStateContext();

    if (!token) {
        // Redirect user if they are not authenticated
        return <Navigate to="/" />;
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="text-center text-lg font-semibold bg-white rounded p-6 shadow-lg dark:bg-gray-900 mb-5">
                <span>Welcome, {user.name} ☕</span>
                <br />
                <span className="text-sm text-gray-700 underline">
                    Connected as : {user.role}
                </span>
            </div>

            {user.role == "admin" || user.role == "manager" ? (
                <DashboardTable />
            ) : (
                <DeveloperDashboardTable />
            )}
        </div>
    );
}

export default Dashboard;
