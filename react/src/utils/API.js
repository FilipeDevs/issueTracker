import axiosClient from "../clients/axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = {
    register: (payload, setErrorCallback, setToken, setUser) => {
        axiosClient
            .post("/register", payload)
            .then((response) => {
                setUser(response.data.user.name);
                setToken(response.data.token);
            })
            .catch((errors) => {
                const response = errors.response;
                if (response && response.status === 422) {
                    setErrorCallback(response.data.errors);
                }
            });
    },

    login: (payload, setErrorCallback, setToken, setUser) => {
        axiosClient
            .post("/login", payload)
            .then((response) => {
                setUser(response.data.user.name);
                setToken(response.data.token);
            })
            .catch((errors) => {
                const response = errors.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrorCallback(response.data.errors);
                    } else {
                        setErrorCallback({
                            email: [response.data.message],
                            password: [response.data.message],
                        });
                    }
                }
            });
    },

    logout: (setToken, setUser) => {
        axiosClient.post("/logout").then((response) => {
            setUser(null);
            setToken(null);
            toast.success(response.data.message);
        });
    },

    getProjects: (setProjects, setLoading) => {
        axiosClient
            .get("/projects")
            .then((response) => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    },

    getUsers: (setUsers, setLoading) => {
        axiosClient
            .get("/users")
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    },

    createProject: (project, setProjects) => {
        axiosClient
            .post("/projects", project)
            .then((response) => {
                toast.success("New project created !");
                setProjects((prevProjects) => [...prevProjects, response.data]);
            })
            .catch((error) => {
                console.error(
                    "Error creating new project:",
                    error.response.data.message
                );

                toast.error(error.response.data.message);
            });
    },
};

export default API;
