import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

function DashboardTable() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProjects, setHasMoreProjects] = useState(true);

    useEffect(() => {
        setLoading(true);
        API.getProjects(
            setProjects,
            setLoading,
            currentPage,
            setHasMoreProjects
        );
    }, [currentPage]);

    if (!loading) {
        console.log(projects);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
            <h1 className="px-5 py-3 text-2xl font-medium">Projects</h1>
            <div className="flex p-5 bg-white dark:bg-gray-900 items-center">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for projects"
                    ></input>
                </div>
                <div className="items-center">
                    <button
                        type="button"
                        className="px-3 h-8 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                    >
                        New project
                    </button>
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
                        <th scope="col" className="px-2 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {!loading &&
                        projects.map((project) => (
                            <tr
                                key={project.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white"
                                >
                                    <Link to={`project/${project.id}`}>
                                        {project.name}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    <p>{project.description}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <ul>
                                        {project.users
                                            .slice(0, 2)
                                            .map((contributor) => (
                                                <li key={contributor.id}>
                                                    {contributor.name}
                                                </li>
                                            ))}
                                    </ul>
                                </td>
                                <td className="px-1 py-1 underline">Edit</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="flex p-5">
                <button
                    type="button"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage == 1}
                    className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
                >
                    Previous
                </button>

                <button
                    type="button"
                    disabled={!hasMoreProjects}
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    className={`flex items-center justify-center px-3 h-8 ml-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover-bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover-bg-gray-700 dark:hover-text-white ${
                        !hasMoreProjects ? "cursor-not-allowed" : ""
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DashboardTable;
