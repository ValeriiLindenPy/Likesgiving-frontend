import api from "@/app/api/auth/baseaxios";



export const makeLike = async (id, token) => {
    try {
        const response = await api.put(`posts/add-like/${id}/`, null, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to add like");
        }
    } catch (error) {
        throw error;
    }
};
