import axios from "axios";
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

    getProject: async (projectId) => {
        try {
            const response = await axiosClient.get(`/projects/${projectId}`);
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

    createTicket: async (ticket) => {
        try {
            const response = await axiosClient.post("/tickets", ticket);
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

    updateTicket: async (ticket) => {
        try {
            const response = await axiosClient.put(
                `/tickets/${ticket.id}`,
                ticket
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    addTeamMember: async (contributors, projectId) => {
        try {
            const response = await axiosClient.put(
                `/projects/addMembers/${projectId}`,
                { contributors }
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    removeTeamMember: async (member_id, projectId) => {
        try {
            const response = await axiosClient.put(
                `/projects/removeMember/${projectId}`,
                { member_id }
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

    deleteTicket: async (ticket) => {
        try {
            const response = await axiosClient.delete(`/tickets/${ticket.id}`);
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
            const response = await axiosClient.get(
                `/tickets/project/${project_id}`
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getTicket: async (ticket_id) => {
        try {
            const response = await axiosClient.get(`/tickets/${ticket_id}`);
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    getTicketComments: async (ticket_id) => {
        try {
            const response = await axiosClient.get(`/comments/${ticket_id}`);
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    postCommentOnTicket: async (comment) => {
        try {
            const response = await axiosClient.post(`/comments`, comment);
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    updateCommentOnTicket: async (comment) => {
        try {
            console.log(comment);
            const response = await axiosClient.put(
                `/comments/${comment.id}`,
                comment
            );
            return response.data;
        } catch (error) {
            return await Promise.reject(error);
        }
    },
};

export default API;
