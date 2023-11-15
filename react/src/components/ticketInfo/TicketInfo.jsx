import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UpdateTicket from "../forms/UpdateTicket";
import API from "../../utils/API";
import Loading from "../Loading";

function TicketInfo({ id, projectId }) {
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [ticketDataChanged, setTicketDataChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState({});
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                setLoading(true);
                const ticketData = await API.getTicket(id);
                const data = await API.getProjectContributors(projectId);
                setUsers(data);
                setTicket(ticketData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchTicket();
    }, [id, projectId, ticketDataChanged]);

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    const formatTimestamp = (timestamp) => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(timestamp).toLocaleString("en-US", options);
    };

    return (
        <div className="flex">
            <div className="flex-1 pr-8">
                <h1 className="text-2xl font-bold mb-4 mr-2">{ticket.name}</h1>

                <p className="text-gray-600">{ticket.description}</p>
            </div>

            <div className="w-1/4 bg-gray-100 p-4 rounded h-screen">
                <div className="flex">
                    <h2 className="text-2xl font-bold mb-6">Ticket Info</h2>
                    <button
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                        }}
                    >
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                            <svg
                                className="w-5 h-5 ml-2 mb-5 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                            >
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                            </svg>
                        </p>
                    </button>
                </div>

                <div className="mb-4">
                    <label className="font-bold">Assignee:</label>
                    <p>{ticket.assignee_name}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Author:</label>
                    <p>{ticket.author_name}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Type:</label>
                    <p>{ticket.type}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Status:</label>
                    <p>{ticket.status}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Priority:</label>
                    <p>{ticket.priority}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Time estimate:</label>
                    <p>{ticket.time_estimate} hours</p>
                </div>
                <div className="mb-4">
                    <Link to={`/project/${ticket.project_id}`}>
                        <a className="font-bold underline">
                            Associated Project
                        </a>
                    </Link>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Created At:</label>
                    <p>{formatTimestamp(ticket.created_at)}</p>
                </div>
                <div className="mb-4">
                    <label className="font-bold">Updated At:</label>
                    <p>{formatTimestamp(ticket.updated_at)}</p>
                </div>
            </div>
            {isModalUpdateOpen && (
                <UpdateTicket
                    onClose={() => setIsModalUpdateOpen(false)}
                    ticket={ticket}
                    ticketDataChanged={() =>
                        setTicketDataChanged(!ticketDataChanged)
                    }
                    users={users}
                    redirectToProject={() => {setIsRedirect(true)}}
                />
            )}
        </div>
    );
}

export default TicketInfo;
