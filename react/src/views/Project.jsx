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

    if (loading)
        return (
            <div className="flex items-center justify-center">
                <Loading />
            </div>
        );

    return (
        <div className="flex p-4 sm:ml-64">
            <div className="w-1/3 pr-4">
                <ProjectTeamTable project={project} />
            </div>
            <div className="w-2/3">
                <ProjectTicketsTable project={project} />
            </div>
        </div>
    );
}

export default Project;
