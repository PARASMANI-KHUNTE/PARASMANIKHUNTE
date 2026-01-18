import api from '../api';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const { data } = await api.post('/upload', formData);
        return data.url;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};
