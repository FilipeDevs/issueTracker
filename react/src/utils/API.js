import axiosClient from "../clients/axios-client";

const API = {
    register: async (payload) => {
        try {
            const response = await axiosClient.post("/register", payload);
            return response.data;
        } catch (errors) {
            return await Promise.reject(errors);
        }
    },

    login: async (payload) => {
        try {
            const response = await axiosClient.post("/login", payload);
            return response.data;
        } catch (errors) {
            return await Promise.reject(errors);
        }
    },

    logout: async () => {
        try {
            const response = await axiosClient.post("/logout");
            return response.data;
        } catch (errors) {
            return await Promise.reject(errors);
        }
    },

    getProjects: async () => {
        try {
            const response = await axiosClient.get("/projects");
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getUsers: async () => {
        try {
            const response = await axiosClient.get("/users");
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    createProject: async (project) => {
        try {
            const response = await axiosClient.post("/projects", project);
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    updateProject: async (project) => {
        try {
            const response = await axiosClient.put(
                `/projects/${project.id}`,
                project
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    deleteProject: async (project) => {
        try {
            const response = await axiosClient.delete(
                `/projects/${project.id}`
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getProjectContributors: async (project_id) => {
        try {
            const response = await axiosClient.get(
                `/users/assigned/${project_id}`
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getAvailableUsers: async (project_id) => {
        try {
            const response = await axiosClient.get(
                `/users/available/${project_id}`
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getProjectTickets: async (project_id) => {
        try {
            const response = await axiosClient.get(`/tickets/${project_id}`);
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },
};

export default API;
