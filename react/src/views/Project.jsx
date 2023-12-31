import { useParams } from "react-router-dom";
import ProjectTeamTable from "../components/tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/tables/ProjectTicketsTable";
import { useEffect, useState } from "react";
import API from "../utils/API";
import Loading from "../components/Loading";
import TicketsPieChart from "../components/Charts/TicketsPieChart";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

function Project() {
    const { token } = useStateContext();
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [usersDataChanged, setUsersDataChanged] = useState(false);
    const [ticketsDataChanged, setTicketsDataChanged] = useState(false);
    const [tickets, setTickets] = useState([]);

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

    // Fetch all tickets
    useEffect(() => {
        const fetchProjectTickets = async () => {
            try {
                const data = await API.getProjectTickets(id);
                setTickets(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchProjectTickets();
    }, [id, ticketsDataChanged]);

    if (!token) {
        // Redirect user if they are not authenticated
        return <Navigate to="/" />;
    }

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
                    <ProjectTicketsTable
                        projectId={id}
                        users={users}
                        tickets={tickets}
                        ticketsDataChanged={() =>
                            setTicketsDataChanged(!ticketsDataChanged)
                        }
                    />
                </div>
            </div>
            <div className="mb-2 mt-5 p-4 text-center shadow-md sm:rounded-lg bg-white">
                <h2 className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                    Statistics
                </h2>
                <div className="flex w-full">
                    <div className="mr-4 w-full">
                        <TicketsPieChart
                            tickets={tickets}
                            title={"Tickets by status"}
                            filter={"status"}
                        />
                    </div>
                    <div className="mr-4 w-full">
                        <TicketsPieChart
                            tickets={tickets}
                            title={"Tickets by type"}
                            filter={"type"}
                        />
                    </div>
                    <div className="mr-4 w-full">
                        <TicketsPieChart
                            tickets={tickets}
                            title={"Tickets by priority"}
                            filter={"priority"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
