import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/superheroApi';
import { DEFAULT_PAGE_LIMIT } from '../config';


export const useSuperheroes = (page = 1, limit = DEFAULT_PAGE_LIMIT) => {
    return useQuery({
        queryKey: ['superheroes', page, limit],
        queryFn: () => api.getSuperheroes(page, limit),
        keepPreviousData: true
    });
};


export const useSuperhero = (id) => {
    return useQuery({
        queryKey: ['superhero', id],
        queryFn: () => api.getSuperheroById(id),
        enabled: !!id
    });
};


export const useCreateSuperhero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.createSuperhero,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['superheroes'] });
        }
    });
};


export const useUpdateSuperhero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }) => api.updateSuperhero(id, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['superheroes'] });
            queryClient.invalidateQueries({ queryKey: ['superhero', data.data?.id] });
        }
    });
};


export const useDeleteSuperhero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: api.deleteSuperhero,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['superheroes'] });
        }
    });
};


export const useAddImages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }) => api.addImages(id, formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['superhero', data.data?.id] });
        }
    });
};


export const useRemoveImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ heroId, imageId }) => api.removeImage(heroId, imageId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['superhero', data.data?.id] });
        }
    });
};
