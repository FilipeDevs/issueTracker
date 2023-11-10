import { useEffect, useState } from "react";
import API from "../../utils/API";
import Loading from "../Loading";
import AddTeamMember from "../forms/AddTeamMember";
import { toast } from "react-toastify";

function ProjectTeamTable({ project }) {
    const [users, setUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    // Table Refresh
    const [usersDataChanged, setUsersDataChanged] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Pagination Logic
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;

    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleNextPage = () => {
        if (indexOfLastUser < users.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstUser > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleRemoveMember = async (e, userId) => {
        e.preventDefault();
        try {
            setLoading(true);
            API.removeTeamMember(userId, project.id);
            setLoading(false);
            setUsersDataChanged(!usersDataChanged);
            toast.success("Member removed successfully !");
        } catch (error) {
            console.error("Error removing member from project:", error);
            toast.error("Error removing member from project !");
        }
    };

    // Fetch contributors of the project
    useEffect(() => {
        const fetchContributors = async () => {
            try {
                setLoading(true);
                const data = await API.getProjectContributors(project.id);
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchContributors();
    }, [usersDataChanged, project.id]);

    // Fetch all available users for the project
    useEffect(() => {
        const fetchAvailableMembers = async () => {
            try {
                const data = await API.getAvailableUsers(project.id);
                setAvailableUsers(data);
            } catch (error) {
                console.error("Error fetching available users:", error);
            }
        };

        fetchAvailableMembers();
    }, [usersDataChanged, project.id]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <div className="flex flex-grow p-5 bg-white dark:bg-gray-900 items-center justify-between">
                <h3 className="text-1xl font-medium">Team</h3>
                <button
                    type="button"
                    onClick={() => setIsModalMemberOpen(true)}
                    className="px-3 h-8 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                >
                    New member
                </button>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs border text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        <th scope="col" className="px-6 py-2">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Email
                        </th>

                        <th scope="col" className="px-2 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">
                                <Loading />
                            </td>
                        </tr>
                    ) : currentUsers.length == 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="inline-block p-5">
                                    No team members found for this project...
                                </span>
                            </td>
                        </tr>
                    ) : (
                        currentUsers.map((user) => (
                            <tr
                                key={user.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white"
                                >
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    <p>{user.email}</p>
                                </td>
                                <td className="px-1 py-1">
                                    <button
                                        onClick={(e) => {
                                            handleRemoveMember(e, user.id);
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                                            />
                                        </svg>
                                    </button>
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
                    disabled={indexOfFirstUser === 0}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfFirstUser === 0 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={indexOfLastUser >= users.length}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastUser >= users.length
                            ? "cursor-not-allowed"
                            : ""
                    }`}
                >
                    Next
                </button>
            </div>
            {isModalMemberOpen && (
                <AddTeamMember
                    onClose={() => setIsModalMemberOpen(false)}
                    availableUsers={availableUsers}
                    usersDataChanged={() =>
                        setUsersDataChanged(!usersDataChanged)
                    }
                    projectId={project.id}
                />
            )}
        </div>
    );
}

export default ProjectTeamTable;
