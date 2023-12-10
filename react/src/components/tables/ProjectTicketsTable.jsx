import { useState } from "react";
import CreateTicket from "../forms/CreateTicket";
import { useNavigate } from "react-router-dom";

function ProjectTicketsTable({
    tickets,
    users,
    projectId,
    ticketsDataChanged,
}) {
    let navigate = useNavigate();
    const [isModalTicketOpen, setIsModalTicketOpen] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Pagination Logic
    const indexOfLastTicket = currentPage * itemsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;

    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handleNextPage = () => {
        if (indexOfLastTicket < tickets.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstTicket > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <div className="flex flex-grow p-5 bg-white dark:bg-gray-900 items-center justify-between">
                <div className="flex items-center">
                    <svg
                        className="w-5 h-5 mr-2 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                        />
                    </svg>
                    <h3 className="text-1xl font-medium">Tickets</h3>
                </div>

                <button
                    type="button"
                    onClick={() => setIsModalTicketOpen(true)}
                    className="px-3 h-8 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                >
                    New ticket
                </button>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs border text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        <th scope="col" className="px-6 py-2">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-2 w-2/3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.map((ticket) => (
                        <tr
                            onClick={() => {
                                navigate(
                                    `/project/${ticket.project_id}/ticket/${ticket.id}`
                                );
                            }}
                            key={ticket.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover-bg-gray-600 cursor-pointer"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white"
                            >
                                {ticket.name}
                            </th>
                            <td className="px-6 py-4">
                                <p>{ticket.description}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="uppercase">{ticket.status}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex p-5">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={indexOfFirstTicket === 0}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastTicket === 0 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={indexOfFirstTicket >= tickets.length}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastTicket >= tickets.length
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                >
                    Next
                </button>
                {isModalTicketOpen && (
                    <CreateTicket
                        onClose={() => setIsModalTicketOpen(false)}
                        users={users}
                        ticketsDataChanged={ticketsDataChanged}
                        project_id={projectId}
                    />
                )}
            </div>
        </div>
    );
}

export default ProjectTicketsTable;
