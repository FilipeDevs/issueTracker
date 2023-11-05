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
                <Link to={`project/${project.id}`}>{project.name}</Link>
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
                        ...
                    </p>
                </button>
            </td>
        </tr>
    );
}

export default DashboardTableRow;
