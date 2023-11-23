import { useParams } from "react-router-dom";
import ProjectTeamTable from "../components/tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/tables/ProjectTicketsTable";
import { useEffect, useState } from "react";
import API from "../utils/API";
import Loading from "../components/Loading";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [usersDataChanged, setUsersDataChanged] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const projectData = await API.getProject(id);
                setProject(projectData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [id]);

    // Fetch contributors of the project
    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const data = await API.getProjectContributors(id);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchContributors();
    }, [id, usersDataChanged]);

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    return (
        <div className="p-4 sm:ml-64">
            <div className="mb-2 p-4 text-center shadow-md sm:rounded-lg bg-white">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {project.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    {project.description}
                </p>
            </div>
            <div className="flex">
                <div className="w-1/3 pr-4 md:w-1/2">
                    <ProjectTeamTable
                        project={project}
                        users={users}
                        setUsersDataChanged={() => {
                            setUsersDataChanged(!usersDataChanged);
                        }}
                    />
                </div>
                <div className="w-2/3">
                    <ProjectTicketsTable project={project} users={users} />
                </div>
            </div>
        </div>
    );
}

export default Project;
