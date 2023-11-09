import { useParams } from "react-router-dom";
import ProjectTeamTable from "../components/tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/tables/ProjectTicketsTable";

function Project() {
    const { id } = useParams();

    return (
        <div className="flex p-4 sm:ml-64">
            <div className="w-1/3 pr-4">
                <ProjectTeamTable projectId={id} />
            </div>
            <div className="w-2/3">
                <ProjectTicketsTable projectId={id} />
            </div>
        </div>
    );
}

export default Project;
