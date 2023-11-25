import { useEffect, useState } from "react";
import API from "../utils/API";
import Loading from "../components/Loading";
import UserTickets from "../components/tables/UserTickets";

function Tickets() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState({});

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const ticketsData = await API.getUserTickets();
                setTickets(ticketsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    console.log(tickets);

    return (
        <div>
            <UserTickets />
        </div>
    );
}

export default Tickets;
