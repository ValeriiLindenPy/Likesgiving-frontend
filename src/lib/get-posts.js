import api from "@/app/api/auth/baseaxios";




export const getPosts = async (postType, token) => {
    try {
        const response = await api.get(`posts/get_posts/${postType}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to fetch posts");
        }
    } catch (error) {
        throw error;
    }
};
