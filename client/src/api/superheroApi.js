import axios from 'axios';
import { API_URL, DEFAULT_PAGE_LIMIT } from '@/config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


export const getSuperheroes = async (page = 1, limit = DEFAULT_PAGE_LIMIT) => {
    const response = await api.get('/superheroes', {
        params: { page, limit }
    });
    return response.data;
};


export const getSuperheroById = async (id) => {
    const response = await api.get(`/superheroes/${id}`);
    return response.data;
};


export const createSuperhero = async (formData) => {
    const response = await api.post('/superheroes', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const updateSuperhero = async (id, formData) => {
    const response = await api.put(`/superheroes/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const deleteSuperhero = async (id) => {
    const response = await api.delete(`/superheroes/${id}`);
    return response.data;
};


export const addImages = async (id, formData) => {
    const response = await api.post(`/superheroes/${id}/images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};


export const removeImage = async (heroId, imageId) => {
    const response = await api.delete(`/superheroes/${heroId}/images/${imageId}`);
    return response.data;
};

export default api;
