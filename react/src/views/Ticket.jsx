import { useParams } from "react-router-dom";
import TicketInfo from "../components/ticketInfo/TicketInfo";

function Ticket() {
    const { project, id } = useParams();
    return (
        <div className="p-4 sm:ml-64">
            <TicketInfo id={id} projectId={project} />
        </div>
    );
}

export default Ticket;
