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
                toast.success(response.data.message);
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
                toast.success(response.data.message);
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

    getProjects: (setProjects, setLoading, page, setHasMoreProjects) => {
        axiosClient
            .get(`/projects?page=${page}`)
            .then((response) => {
                setProjects(response.data);
                setHasMoreProjects(response.data.length >= 3);
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
};

export default API;
