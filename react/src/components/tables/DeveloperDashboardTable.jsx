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
                <h1 className="text-3xl font-medium">Assigned Projects</h1>
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
