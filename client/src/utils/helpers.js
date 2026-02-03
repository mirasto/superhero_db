export const arrayToString = (arr) => {
    if (!arr) return '';
    if (typeof arr === 'string') return arr;
    return arr.join(', ');
};


export const prepareSuperheroFormData = (formData, selectedFiles = []) => {
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
        const value = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
        submitData.append(key, value);
    });
    selectedFiles.forEach(file => submitData.append('images', file));
    return submitData;
};

// Temporary debug comment
