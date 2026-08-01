import api from "./axios";

export const getEngineers = () => {
    return api.get("/engineers");
};

export const getEngineerById = (id) => {
    return api.get(`/engineers/${id}`);
};

export const createEngineer = (data) => {
    return api.post("/engineers", data);
};

export const updateEngineer = (id, data) => {
    return api.put(`/engineers/${id}`, data);
};

export const deleteEngineer = (id) => {
    return api.delete(`/engineers/${id}`);
};