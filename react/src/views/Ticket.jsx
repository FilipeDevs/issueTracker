import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TicketInfo from "../components/ticketInfo/TicketInfo";

function Ticket() {
    const { id } = useParams();

    return (
        <div className="p-4 sm:ml-64">
            <TicketInfo id={id} />
        </div>
    );
}

export default Ticket;
