import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const createProject = (project) => {
    return axios.post(`${API_BASE_URL}/projects/`, project);
};

export const getProject = (projectId) => {
    return axios.get(`${API_BASE_URL}/projects/${projectId}`);
};
