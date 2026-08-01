import api from "./axios";

export const getMachines = () => {
    return api.get("/machines");
};

export const getMachineById = (id) => {
    return api.get(`/machines/${id}`);
};

export const createMachine = (data) => {
    return api.post("/machines", data);
};

export const updateMachine = (id, data) => {
    return api.put(`/machines/${id}`, data);
};

export const deleteMachine = (id) => {
    return api.delete(`/machines/${id}`);
};