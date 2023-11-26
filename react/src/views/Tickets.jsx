import UserTickets from "../components/tables/UserTickets";

function Tickets() {
    return (
        <div className="p-4 sm:ml-64">
            <div className="mb-2 p-4 flex items-center justify-center shadow-md sm:rounded-lg bg-white">
                <svg
                    className="w-6 h-6 mr-2 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v2H7V2ZM5 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 4H8a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2Zm0-4H8a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Assigned Tickets
                </h2>
            </div>
            <UserTickets />
        </div>
    );
}

export default Tickets;
