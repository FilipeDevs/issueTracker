import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../utils/API";
import Loading from "../Loading";

function UsersTable() {
    const [usersDataChanged, setUsersDataChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fectUsers = async () => {
            try {
                setLoading(true);
                const usersData = await API.getUsers();
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fectUsers();
    }, [usersDataChanged]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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

    const handleUpdateRole = async (e, id) => {
        e.preventDefault();
        const selectedRole = e.target.value;
        const user = {
            id: id,
            role: selectedRole,
        };
        try {
            await API.updateUserRole(user);
            setUsersDataChanged(!usersDataChanged);
            toast.warning("User role updated !");
        } catch (error) {
            console.log(error);
            toast.error("Error updating user role !");
            setUsersDataChanged(!usersDataChanged);
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
                    <h3 className="text-1xl font-medium">Users</h3>
                </div>
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

                        <th scope="col" className="px-2 py-2">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length == 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="inline-block p-5">
                                    No users found...
                                </span>
                            </td>
                        </tr>
                    ) : (
                        currentUsers.map((currentUser) => (
                            <tr
                                key={currentUser.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-blue-800 whitespace-nowrap dark:text-white"
                                >
                                    {currentUser.name}
                                </th>
                                <td className="px-6 py-4">
                                    <p>{currentUser.email}</p>
                                </td>

                                <td className="px-1 py-1">
                                    <select
                                        defaultValue={currentUser.roles[0].name}
                                        id="roles"
                                        onChange={(e) => {
                                            handleUpdateRole(e, currentUser.id);
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="developer">
                                            Developer
                                        </option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
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
        </div>
    );
}

export default UsersTable;
