import { Link } from "react-router-dom";

function DashboardTableRow({ project, updateData, openUpdateForm }) {
    const handleEdit = () => {
        updateData();
        openUpdateForm();
    };

    return (
        <tr
            key={project.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600"
        >
            <th
                scope="row"
                className="px-6 py-4 font-medium text-blue-700 whitespace-nowrap dark:text-white"
            >
                <Link
                    to={{
                        pathname: `/project/${project.id}`,
                        state: { project },
                    }}
                >
                    {project.name}
                </Link>
            </th>
            <td className="px-6 py-4">
                <p>{project.description}</p>
            </td>
            <td className="px-6 py-4">
                <ul>
                    {project.users.slice(0, 2).map((contributor) => (
                        <li key={contributor.id}>{contributor.name}</li>
                    ))}
                </ul>
            </td>
            <td className="px-1 py-1">
                <button onClick={handleEdit}>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                        <svg
                            className="w-4 h-4 text-gray-800 dark:text-white"
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
            </td>
        </tr>
    );
}

export default DashboardTableRow;
