import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = (username, password) => api.post('/auth/login', { username, password });
export const register = (username, password) => api.post('/auth/register', { username, password });

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data); // data is FormData
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getExperience = () => api.get('/experience');
export const createExperience = (data) => api.post('/experience', data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

export const getEducation = () => api.get('/education');
export const createEducation = (data) => api.post('/education', data);
export const updateEducation = (id, data) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

export const sendMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

export const chatWithAI = (message) => api.post('/ai/chat', { message });

export const getContact = () => api.get('/contact');
export const updateContact = (data) => api.put('/contact', data);
export const getVisitorCount = () => api.get('/visitors');
export const incrementVisitor = () => api.post('/visitors');

export default api;
