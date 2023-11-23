import { useEffect, useState } from "react";
import API from "../../utils/API";
import CreateProject from "../forms/CreateProject";
import Loading from "../Loading";
import UpdateProject from "../forms/UpdateProject";
import DashboardTableRow from "./DashboardTableRow";
import { useStateContext } from "../../contexts/ContextProvider";

function DeveloperDashboardTable() {
    const { user } = useStateContext();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Fetch assigned projects (3 per page)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await API.getAssignedProjects(user.id);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching assigned projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user.id]);

    // Pagination Logic
    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    const currentProjects = projects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    const handleNextPage = () => {
        if (indexOfLastProject < projects.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstProject > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <div className="flex flex-grow p-5 bg-white dark:bg-gray-900 items-center justify-between">
                <div className="flex items-center">
                    <svg
                        className="w-5 h-6 mr-2 mt-1 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                    </svg>
                    <h1 className="text-3xl font-medium">Assigned Projects</h1>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs border text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="">
                        <th scope="col" className="px-6 py-2">
                            Project
                        </th>
                        <th scope="col" className="px-6 py-2 w-2/3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Contributors
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">
                                <Loading />
                            </td>
                        </tr>
                    ) : (
                        currentProjects.map((project) => (
                            <DashboardTableRow
                                key={project.id}
                                role={user.role}
                                project={project}
                            />
                        ))
                    )}
                </tbody>
            </table>
            <div className="flex p-5">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={indexOfFirstProject === 0}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfFirstProject === 0 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={indexOfLastProject >= projects.length}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        indexOfLastProject >= projects.length
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

export default DeveloperDashboardTable;
