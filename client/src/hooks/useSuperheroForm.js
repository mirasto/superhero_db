import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuperhero, useCreateSuperhero, useUpdateSuperhero } from './useSuperheroes';
import { prepareSuperheroFormData, arrayToString } from '@utils/helpers';

export const useSuperheroForm = (id) => {
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: ''
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState({});

    const { data: existingData, isLoading: isLoadingExisting } = useSuperhero(id);
    const createMutation = useCreateSuperhero();
    const updateMutation = useUpdateSuperhero();

    useEffect(() => {
        if (isEditMode && existingData?.data) {
            const hero = existingData.data;
            setFormData({
                nickname: hero.nickname || '',
                real_name: hero.real_name || '',
                origin_description: hero.origin_description || '',
                superpowers: arrayToString(hero.superpowers),
                catch_phrase: hero.catch_phrase || ''
            });
        }
    }, [isEditMode, existingData]);

    const validate = () => {
        const newErrors = {};
        if (!formData.nickname.trim()) newErrors.nickname = 'Nickname is required';
        if (!formData.real_name.trim()) newErrors.real_name = 'Real name is required';
        if (!formData.origin_description.trim()) newErrors.origin_description = 'Origin story is required';
        if (!formData.superpowers.trim()) newErrors.superpowers = 'Superpowers are required';
        if (!formData.catch_phrase.trim()) newErrors.catch_phrase = 'Catch phrase is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const submitData = prepareSuperheroFormData(formData, selectedFiles);

        try {
            if (isEditMode) {
                await updateMutation.mutateAsync({ id, formData: submitData });
            } else {
                await createMutation.mutateAsync(submitData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving superhero:', error);
        }
    };

    return {
        formData,
        errors,
        isEditMode,
        isLoadingExisting,
        existingData,
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        handleChange,
        handleFilesSelected: setSelectedFiles,
        handleSubmit
    };
};
