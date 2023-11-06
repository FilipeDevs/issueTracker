import { useEffect, useState } from "react";
import API from "../../utils/API";
import CreateProject from "../forms/CreateProject";
import Loading from "../Loading";
import UpdateProject from "../forms/UpdateProject";
import DashboardTableRow from "./DashboardTableRow";

function DashboardTable() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [selectedProjectData, setSelectedProjectData] = useState({});

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    // Table Refresh
    const [projectDataChanged, setProjectDataChanged] = useState(false);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await API.getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch all projects (3 per page)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await API.getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [projectDataChanged]);

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
                <h1 className="text-3xl font-medium">Projects</h1>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 h-8 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                >
                    New project
                </button>
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
                    ) : (
                        currentProjects.map((project) => (
                            <DashboardTableRow
                                key={project.id}
                                project={project}
                                updateData={() =>
                                    setSelectedProjectData(project)
                                }
                                openUpdateForm={() =>
                                    setIsModalUpdateOpen(true)
                                }
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
                {isModalOpen && (
                    <CreateProject
                        onClose={() => setIsModalOpen(false)}
                        users={users}
                        projectDataChanged={() =>
                            setProjectDataChanged(!projectDataChanged)
                        }
                    />
                )}
                {isModalUpdateOpen && (
                    <UpdateProject
                        onClose={() => setIsModalUpdateOpen(false)}
                        projectData={selectedProjectData}
                        projectDataChanged={() =>
                            setProjectDataChanged(!projectDataChanged)
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default DashboardTable;
