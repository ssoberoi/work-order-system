import api from "./axios";

export const getWorkOrders = (params) => {
    return api.get("/work-orders", {
        params,
    });
};

export const getWorkOrderById = (id) => {
    return api.get(`/work-orders/${id}`);
};

export const createWorkOrder = (data) => {
    return api.post("/work-orders", data);
};

export const updateWorkOrder = (id, data) => {
    return api.put(`/work-orders/${id}`, data);
};

export const deleteWorkOrder = (id) => {
    return api.delete(`/work-orders/${id}`);
};