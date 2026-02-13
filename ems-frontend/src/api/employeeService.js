import axios from "axios";

const API_BASE = "http://localhost:8080/api/employees";

export const getEmployees = async (params) => {
    const response = await axios.get(API_BASE, { params });
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
}

export const createEmployee = async (employee) => {
    const response = await axios.post(API_BASE, employee);
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await axios.put(`${API_BASE}/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_BASE}/${id}`);
    return response.data;
};


