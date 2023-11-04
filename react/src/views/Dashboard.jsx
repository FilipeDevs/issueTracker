import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Dashboard() {
    const { user, token } = useStateContext();

    if (!token) {
        // Redirect user if they are not authenticated
        return <Navigate to="/login" />;
    }

    return (
        <div className="p-4 sm:ml-64">
            <p>Hello {user}</p>
        </div>
    );
}

export default Dashboard;
