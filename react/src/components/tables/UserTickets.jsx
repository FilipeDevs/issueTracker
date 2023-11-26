import { useEffect, useState } from "react";
import API from "../../utils/API";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function UserTickets() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    let navigate = useNavigate();

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

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <div className="flex flex-grow p-5 bg-white dark:bg-gray-900 items-center justify-between">
                <div className="flex items-center">
                    <svg
                        className="w-5 h-5 mr-2 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <h3 className="text-1xl font-medium">Tickets</h3>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs border text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        <th scope="col" className="px-6 py-2">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Description
                        </th>

                        <th scope="col" className="px-2 py-2">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentTickets.length == 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="inline-block p-5">
                                    You've not been assigned to any tickets...
                                </span>
                            </td>
                        </tr>
                    ) : (
                        currentTickets.map((currentTicket) => (
                            <tr
                                key={currentTicket.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600"
                            >
                                <th
                                    onClick={() => {
                                        navigate(
                                            `/project/${currentTicket.project_id}/ticket/${currentTicket.id}`
                                        );
                                    }}
                                    scope="row"
                                    className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white cursor-pointer"
                                >
                                    {currentTicket.name}
                                </th>
                                <td className="px-6 py-4">
                                    <p>{currentTicket.description}</p>
                                </td>

                                <td className="px-1 py-1">
                                    <p className="uppercase">
                                        {currentTicket.status}
                                    </p>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex p-5">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={indexOfFirstTicket === 0}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfFirstTicket === 0 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={indexOfLastTicket >= tickets.length}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastTicket >= tickets.length
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserTickets;
