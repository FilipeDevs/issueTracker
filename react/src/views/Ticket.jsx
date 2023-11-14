import { Navigate, useParams } from "react-router-dom";
import TicketInfo from "../components/ticketInfo/TicketInfo";

function Ticket() {
    const { project, id } = useParams();

    const redirectToProject = () => {
        console.log("Hello");
        <Navigate to={`/dashboard`} />;
    };

    <Navigate to={`/dashboard`} />;

    return (
        <div className="p-4 sm:ml-64">
            <TicketInfo
                id={id}
                projectId={project}
                redirectToProject={redirectToProject}
            />
        </div>
    );
}

export default Ticket;
