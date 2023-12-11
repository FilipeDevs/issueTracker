import { useParams } from "react-router-dom";
import TicketInfo from "../components/ticketInfo/TicketInfo";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Ticket() {
    const { token } = useStateContext();
    const { project, id } = useParams();

    if (!token) {
        // Redirect user if they are not authenticated
        return <Navigate to="/" />;
    }

    return (
        <div className="p-4 sm:ml-64">
            <TicketInfo id={id} projectId={project} />
        </div>
    );
}

export default Ticket;
